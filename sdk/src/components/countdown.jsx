import { createSignal,onCleanup,createEffect,createMemo } from "solid-js"
export default props => {
  let frameid
  // const [left,setLeft] = createSignal(props?.end || new Date().getTime() - new Date().getTime())
  const [countdown,setCountdown] = createSignal()
  const time = createMemo(()=>{
    let day = Math.floor(countdown() / 60 / 60 / 24).toString().padStart(2, "0");
    let hour = Math.floor(countdown() / 60 / 60 % 24 ).toString().padStart(2, "0");
    let minute = Math.floor(countdown() / 60 % 60).toString().padStart(2, "0");
    let second = Math.floor(countdown() % 60).toString().padStart(2, "0");
    return day!="00"?`${day}:${hour}:${minute}:${second}`:`${hour}:${minute}:${second}`
  })

   const updateClock = () => {
    const now = Date.now()
    const left = (props?.end - now) / 1000
    setCountdown(left)
    frameid = requestAnimationFrame(updateClock);
  };

  createEffect(() => {
    frameid = requestAnimationFrame(updateClock);
    onCleanup(() => cancelAnimationFrame(frameid));
    if(countdown()&&countdown()<=0&&props?.onTimeout){
      props?.onTimeout(countdown())
    }
  });
  return(
    <>{time()}</>
  )
}


