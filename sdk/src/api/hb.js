import { omit, keys } from 'ramda'
import { createSigner } from "@permaweb/aoconnect/browser";
// import { arGql } from "./argql";

export const GQLUrls = {
  goldsky: 'https://arweave-search.goldsky.com/graphql' ,
  arweave: 'https://arweave.net/graphql',
}

export const DEFAULT_HYPERBEAM_NODE_URL = import.meta.env.VITE_HYPERBEAM_URL || "https://workshop.forward.computer"
export const DEFAULT_GQL_ENDPOINT = import.meta.env.VITE_GQL_ENDPOINT || GQLUrls.goldsky

const toDataItemSigner = (signer) => {

  const DATAITEM_SIGNER_KIND = 'ans104'
  const HTTP_SIGNER_KIND = 'httpsig'
  return async ({ data, tags, target, anchor }) => {
    let resolveUnsigned
    let createCalled
    /**
     * @type {Promise<Buffer>}
     */
    const dataToSign = new Promise((resolve) => { resolveUnsigned = resolve })

    /**
     * receive the signing public credentials and
     * extract what we need to construct the unsigned
     * data item
     */
    const create = async (injected) => {
      createCalled = true
      /**
       * If the signer wishes to receive the arguments
       * and skip serialization to a data item, they can provide this argument.
       *
       * This is useful for signers that internally serialize data items,
       * and drive UI off of the provided inputs ie. ArConnect
       */
      if (injected.passthrough) return { data, tags, target, anchor }

      /**
       * Default the type and alg to be
       * - type: arweave
       * - alg: RSA PSS SHA256 (default for arweave signing)
       */
      // eslint-disable-next-line no-unused-vars
      const { publicKey, type = 1, alg = 'rsa-v1_5-sha256' } = injected

      const unsigned = createDataItemBytes(
        data,
        { type, publicKey: toView(publicKey) },
        { target, tags, anchor }
      )

      /**
       * What is actually signed is the DataItem
       * deephash, so stash the unsigned bytes,
       * and resolve the deepHash.
       *
       * When the signature is ultimately received,
       * we can add it to the unsigned bytes
       */
      resolveUnsigned(unsigned)
      const deepHash = await getSignatureData(unsigned)
      return deepHash
    }

    return signer(create, DATAITEM_SIGNER_KIND)
      .then((res) => {
        /**
         * Ensure create was called in order to produce the signature
         */
        if (!createCalled) {
          throw new Error('create() must be invoked in order to construct the data to sign')
        }

        /**
         * The signer has done the work
         */
        if (typeof res === 'object' && res.id && res.raw) return res

        if (!res.signature || !res.signature) {
          throw new Error('signer must return its signature and address')
        }
        const { signature } = res
        return dataToSign.then((unsigned) => {
          return Promise.resolve(signature)
            .then(toView)
            .then(async (rawSig) => {
              /**
               * Add signature to the data item in the proper
               * position: after the first 2 bytes reserved for signature type
               */
              const signedBytes = unsigned
              signedBytes.set(rawSig, 2)

              const isValid = await verify(signedBytes)
              if (!isValid) throw new Error('Data Item signature is not valid')

              return {
                /**
                 * A data item's ID is the base64url encoded
                 * SHA-256 of the signature
                 */
                id: await crypto.subtle.digest('SHA-256', rawSig)
                  .then(raw => base64url.encode(raw)),
                raw: signedBytes
              }
            })
        })
      })
  }
}

function toANS104Request(fields) {
  const dataItem = {
    target: fields.target,
    anchor: fields.anchor ?? '',
    tags: keys(
      omit(
        [
          'Target',
          'target',
          'Anchor',
          'anchor',
          'Data',
          'data',
          'data-protocol',
          'Data-Protocol',
          'variant',
          'Variant',
          'dryrun',
          'Dryrun',
          'Type',
          'type',
          'path',
          'method',
          'signingFormat',
          'signing-format'
        ],
        fields
      )
    )
      .map(function (key) {
        return { name: key, value: fields[key] }
      }, fields)
      .concat([
        { name: 'data-protocol', value: 'ao' },
        { name: 'type', value: fields.type ?? 'Message' },
        { name: 'variant', value: fields.variant ?? 'ao.N.1' }
      ]),
    data: fields?.data || ''
  }
  return {
    headers: {
      'Content-Type': 'application/ans104',
      'codec-device': 'ans104@1.0',
      'accept-bundle': 'true'
    }, item: dataItem
  }
}



export class HB {
  constructor(params = {}) {
    const {url = DEFAULT_HYPERBEAM_NODE_URL, wallet, gql_url = DEFAULT_GQL_ENDPOINT} = params
    this.url = url || DEFAULT_HYPERBEAM_NODE_URL || import.meta.env.VITE_HYPERBEAM_URL
    this.wallet = wallet,
    this.gql_url = gql_url || DEFAULT_GQL_ENDPOINT
  }
  fetch = function (path, params) {
    return fetch(this.url + path, params).then(res => res?.ok && res?.json())
  }
  send = async function (fields, wallet) {
    try {
      let { target } = fields
      if (!target) throw new Error("Missed target process")
      let signer = createSigner(wallet || this.wallet)
      if (!signer) throw new Error("Missed singer")

      fields['Data-Protocol'] = "ao"
      fields.Variant = "ao.N.1"
      // fields.action = fields.Action
      fields.signingFormat = fields.signingFormat || "ANS-104"

      const ans104Request = toANS104Request(fields)
      // console.log('ans104Request: ', ans104Request);
      const signedRequest = await toDataItemSigner(signer)(ans104Request.item)
      console.log('signedRequest: ', signedRequest?.id);

      let url = this.url
      let path = `/${target}~process@1.0/push/serialize~json@1.0`
      let fetch_req = {
        body: signedRequest.raw,
        url: url + path,
        path,
        method: "POST",
        headers: ans104Request.headers
      }
      const res = await fetch(fetch_req.url, {
        method: fetch_req.method,
        headers: fetch_req.headers,
        body: fetch_req.body,
        redirect: 'follow'
      })

      // if (res.status === 422 && signingFormat === 'HTTP') {
      //   // Try again with different signing format
      //   reqFormatCache[fields.path] = 'ANS-104'
      //   return requestWith({ ...args, signingFormat: 'ANS-104' })(fields)
      // }

      if (res.status == 500) {
        throw new Error(`${res.status}: ${await res.text()}`)
      }

      if (res.status === 404) {
        throw new Error(`${res.status}: ${await res.text()}`)
      }

      if (res.status >= 400) {
        throw new Error(`${res.status}: ${await res.text()}`)
      }

      if (res.status >= 300) {
        return res
      }

      const body = await res.json()

      return {
        id: signedRequest?.id,
        ...body
      }

    } catch (error) {
      throw error
    }
  }
  // query = async function(query,options) {
  //   const gql = arGql({endpointUrl: this.gql_url || GQLUrls.goldsky})
  //   let res = await gql.run(query||'');
  //   return res?.data?.transactions?.edges
  // }
}