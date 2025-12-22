import { createSignal,Show } from 'solid-js'
import './App.css'
import { useWallet } from "arwallet-solid-kit";
import { AoCaptcha } from 'aocaptcha-sdk';



function App() {
  const { connected, address, connecting, showConnector,wallet } = useWallet()

  const testAocaptcha = async()=>{
    // console.log(DEFAULT_HYPERBEAM_NODE_URL,HI,HB)
    const captcha = new AoCaptcha("SP22OUJOsSHVxHQEt3swog79gncGT8M-ehre7qzc68s")
    console.log("captcha : ",captcha)

    const request = await captcha.request({
          Recipient : "nHUF1zKzb7c_wZEFr4W1reBPxKP_PkrH4wVU2nZA-Bw",
          ['Request-Type'] : "Checkin",
          ['X-Note'] :"hhahaa",
          ['X-Color']:"#dddddd"
        },wallet())
        if(!request){throw("request failed")}
        console.log('request: ', request);
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
