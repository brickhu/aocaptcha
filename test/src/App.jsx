import { createSignal,Show } from 'solid-js'
import './App.css'
import { useWallet } from "arwallet-solid-kit";
import { AoCaptcha } from 'aocaptcha-sdk';



function App() {
  const { connected, address, connecting, showConnector,wallet } = useWallet()

   const captcha = new AoCaptcha("1SGjGa3T3l2mq7W81UGaBf26SX61No3YxTOaesUhCCc")

  const testAocaptcha = async()=>{
    // console.log(DEFAULT_HYPERBEAM_NODE_URL,HI,HB)
     

      const request = await captcha.request({
          Recipient : "nHUF1zKzb7c_wZEFr4W1reBPxKP_PkrH4wVU2nZA-Bw",
          ['Request-Type'] : "Checkin",
          ['X-Note'] :"hhahaa",
          ['X-Color']:"#dddddd"
        },wallet())
      if(!request){throw("request failed")}
      const verify = await captcha.verify(request,wallet()).then((r)=>r).catch((e)=>console.log(e))
      console.log('verify: ', verify);
    }


  return (
    <>
      <h1>AoCaptcha Test</h1>
      <div class="card">
        <Show when={connected()} fallback={
          <button onClick={showConnector} disabled={connecting()}>{connecting()?"connecting" : "connect"}</button>
        }>
          <button onClick={testAocaptcha}>
            request a captcha
          </button>
        </Show>
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        <Show when={address()} fallback="Not connected">{address()}</Show>
      </p>
    </>
  )
}

export default App
