
import { render } from "solid-js/web";
import { HB } from "./api/hb" 
import App from "./app"

let _captcha_box
render(() => <App ref={_captcha_box} />, document.body);

export class AoCaptcha {
  constructor(process,options) {
    this.process = process
    this.recipient = options?.recipient || options?.Recipient
    this.type = options?.type || options?.Type || "DEFAULT"
    this.wallet = options?.wallet || options?.Wallet
    this.latest_request = null
    this.MU_URL = options?.ao?.MU_URL || "https://mu.ao-testnet.xyz",
    this.CU_URL = options?.ao?.CU_URL || "https://cu.ao-testnet.xyz",
    this.GATEWAY_URL = options?.ao?.GATEWAY_URL || "https://arweave.net"
    this.MODE = options?.ao?.GATEWAY_URL || "legacy"
    this.URL = "http://node.arweaveoasis.com:8734"

  }
  m = async (pid, tags, data) => {
    try {
      if (!this.wallet) { reject("missed wallet") }
       this.hb = new HB({url: this.URL,wallet: this.wallet})
      // const { message, result } = connect({
      //   MODE: this.MODE,
      //   MU_URL: this.MU_URL || "https://mu.ao-testnet.xyz",
      //   CU_URL: this.CU_URL || "https://cu.ao-testnet.xyz",
      //   GATEWAY_URL: this.GATEWAY_URL || "https://arweave.net"
      // })
      // const msgid = await message({
      //   process: pid,
      //   tags,
      //   data: data || "",
      //   signer: createDataItemSigner(this.wallet)
      // })
      // if (!msgid) { throw ("send message faild or canceled") }
      // const res = await result({
      //   message: msgid,
      //   process: this.process,
      // })

      const res = await this.hb.send({
        target : pid,
        data: data || "",
        ...tags
      },this.wallet)


      return res
    } catch (e) {
      throw (e)
    }
  };
  getLatestRequest() {
    return this.latest_request
  }
  request(params,wallet) {

    return new Promise(async (resolve, reject) => {
      const now = Date.now()
      this.wallet = wallet || this.wallet
      this.recipient = params.recipient || params.Recipient  || this.recipient
      this.type = params['Request-Type'] || params?.type || params?.Type || this.type || "DEFAULT"
      if (!this.process) { reject("missed the captcha process id") }
      if (!this.recipient) { reject("missed the request process id") }
      if (!this.wallet) { reject("missed wallet") }
      // console.log(this.latest_request)
      if (this.latest_request && (now - this.latest_request?.timestamp) < this.latest_request.duration) {
        resolve(this.latest_request)
        return
      }

      params['Action'] = "Request-Captcha"
      params['Recipient'] = params['Recipient'] || this.recipient 
      params['Request-Type'] = params['Request-Type'] || this.type

      const {id, outbox} = await this.m(this.process, params , "a aocaptcha request").catch(err => reject(err))

      if(outbox?.["1"]) {
        const { Data, ...r } = outbox?.["1"]
        const request = {
          id,
          paths: Data && JSON.parse(Data),
          timestamp: Number(r['Request-Time']),
          duration: Number(r['Request-Duration']),
          type: r['Captcha-Type'],
          digits: Number(r["Captcha-Digits"]),
          request_type : r["Request-Type"],
          recipient : this.recipient
        }
        console.log('request sucessed: ', id);
        this.latest_request = request
        resolve(request)
      }else{
        throw new Error("fetch captcha faild.")
      }
      

    });
  }
  verify(request, wallet) {
    return new Promise(async (resolve, reject) => {
      const now = Date.now()
      this.wallet = wallet || this.wallet
      if (!this.process) { reject("missed the captcha process id") }
      if (!request) { reject("missed request data.") }
      if (!request.paths) { reject("missed captcha data.") }
      if (!request.timestamp || (request?.timestamp + request?.duration) < now) {
        reject("the captcha is expired.")
      }
      if (!this.wallet && !wallet) { reject("missed wallet") }
      _captcha_box.show(request, async(input) => {
        try {
          const tags = {
            Action : "Verify-Captcha" ,
            ['Request-Id'] : request?.id,
            ["Pushed-For"] : request?.id,
            ["App-Name"] : "AoCaptcha"
          }
          const {id,outbox} = await this.m(this.process, tags, input).catch(err => reject(err))
          // console.log('verify res: ', res);
          const hb = this.hb || new HB({url: this.URL})
          const result = await hb.fetch(`/${request?.recipient}~process@1.0/compute&id=${id}/results/serialize~json@1.0`)
          if (outbox?.["1"]) {
            
            const r = outbox?.["1"]

            const verification = {
              id: r['Verify-Id'] || id,
              request_id: r['Request-Id'],
              request_time: r["Request-Time"],
              request_type: r["Request-Type"],
              verified_time: r['Verified-Time'],
              verified: true,
              result
            }
            console.log('verify sucessed: ', verification?.id);
            this.latest_request = null
            resolve(verification)
            return verification
          } else {
            reject("verify failed")
            this.latest_request = null
            throw ("failed")
          }
        } catch (err) {
          throw (err)
        }
      }, () => {
        reject("cancelled")
      })
    })
  }
}

