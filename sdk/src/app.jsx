


import { Portal } from "solid-js/web";
import { onMount,createSignal, Switch, Match, batch, For,createMemo,onCleanup,createEffect } from "solid-js"
import css from "./app.module.css"
import Spinner from "./components/spinner"
import Countdown from "./components/countdown"
import Logo from "./components/logo"

export default function App(props) {
  let checkFn = null;
  let cancelFn = null
  const [captcha,setCaptcha] = createSignal()
  const [visible, setVisible] = createSignal(false);
  const [verifying,setVerifying] =  createSignal(false)
  const [error,setError] = createSignal()
  const [input,setInput] = createSignal()
  const enableVerify = createMemo(()=>{
    if(captcha()!=null&&input()!=null&&input()?.length == (captcha()?.digits || 3)){
      return true
    }else{
      return false
    }
  })

  const HandlerVerify = ()=>{
    if(enableVerify()){
      setVerifying(true)
      checkFn(input()).then((res)=>batch(()=>{
        setVisible(false)
        setInput(null)
      }))
      .catch((err)=>{
        console.error(err)
        setError("verify failed")
        setVisible(false)
      })
      .finally(()=>setVerifying(false))
    }
    
  }

  onMount(()=>{
    props?.ref({
      show:(captcha,fn1,fn2)=>{
        checkFn = fn1
        cancelFn = fn2
        batch(()=>{
          setVerifying(false)
          setCaptcha(captcha)
          setInput(null)
          setError(null)
          setVisible(true)
        })
      },
      close:(e)=>{
        setVisible(false)
      }
    })
  })
  onCleanup(()=>{
    console.log("aocaptcha is removed")
  })
  return(
    <Portal>
      <div class={css.outter} id="ao-captcha-sdk" style={{ visibility: `${visible() ? "visible" : "hidden"}` }}>
        <div
          class={css.container}
          style={{
            translate: `${visible() ? "0% 0%" : "0% 50%"}`,
            opacity: `${visible() ? "100" : "0"}`,
          }}
        >
          <div class={css.content}>
            <div class={css.head}>
              <p style={{ display: "flex", justifyContent : "start", alignItems:"center", gap: "0.5em"}}>
                <Switch>
                  <Match when={verifying()}><Spinner/> <span>Verifying...</span></Match>
                  <Match when={!verifying()}><Logo/> <span>AoCaptcha</span></Match>
                </Switch>
              </p>
              <button disabled={verifying()} onClick={()=>{
                setVisible(false)
                cancelFn()
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12L5.293 6.707a1 1 0 0 1 0-1.414"/></svg>
              </button>
            </div>
            <div class={css.main}>
              <div class={css.captchabox}>
  
                <For each={captcha()?.paths} fallback={<div>loading...</div>}>
                  {(item)=><div class={css.svgbox}>
                    <svg viewBox={item?.[0]} xmlns="http://www.w3.org/2000/svg">
                      <path d={item?.[1]} fill="currentColor"/>
                    </svg>
                  </div>}
                </For>
              </div>
              <div style={{
                "font-size" : "0.8em",
                "text-align" : "center",
                "padding-top" : "0.2em"
              }}>Expired in:<Countdown end={captcha()?.timestamp+captcha()?.duration}/></div>
            </div>
            <div class={css.foot}>
              <input 
                class={css.input}
                placeholder="input the code above"
                type={"text"}
                value={input()}
                required 
                minlength={captcha()?.digits || 3}
                disabled = {verifying()}
                onInput={(e)=>{
                  setInput(e.target.value)
                }}
                style={{
                  padding : "4px 4px 4px 4px",
                  "min-width" : "20px",
                  "min-width": "5em",
                  "font-size" : "1.2em"
                }}
              />
              <button 
                class={css.btn}
                disabled={!enableVerify()}
                onClick={HandlerVerify}
                style={{
                   "--color-border" : "var(--color-primary)",
                   "--color-bg" : "var(--color-primary)",
                   "--color-text" : "var(--color-primary-content)",
                  "border-radius": "100% 100% 100% 100%",
                  width : "3em",
                  height : "3em"
                }}
              >
                {verifying()?<Spinner size={"2em"}/>:<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="24" stroke-dashoffset="24" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M5 11l6 6l10 -10"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.86s" values="24;0"/></path></svg>}
              </button>
            </div>
          </div>
          
        </div>
        <div class={css.backdrop} style={{ opacity: `${visible() ? "100" : "0"}` }}></div>
      </div>
    </Portal>
  )
}