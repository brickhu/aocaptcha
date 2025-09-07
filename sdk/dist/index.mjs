(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._outter_1ymef_4{position:fixed;top:0;left:0;z-index:1000;width:0;height:0;all:initial;font-family:system-ui,sans-serif;font-size:1rem}@media (prefers-color-scheme: dark){._outter_1ymef_4 *{--color-base-0: rgb(0, 0, 0);--color-base-100: #171717;--color-base-200: #343434;--color-base-content: #c2c2c2;--color-primary: rgb(1, 136, 127);--color-primary-content: rgb(227, 218, 237)}}@media (prefers-color-scheme: light){._outter_1ymef_4 *{--color-base-0: rgb(255, 255, 255);--color-base-100: #e9e9e9;--color-base-200: #c9c9c9;--color-base-content: #171717;--color-primary: rgb(3, 187, 175);--color-primary-content: rgb(227, 218, 237)}}._backdrop_1ymef_47{background:rgb(from var(--color-base-0) r g b / 60%);width:100vw;height:100vh;position:fixed;top:0;left:0;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);z-index:1000}._container_1ymef_59{position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;color:var(--color-base-content);z-index:1001}._container_1ymef_59 button{--color-border: var(--color-base-200);--color-bg: rgb(from var(--color-base-200) r g b / 60%);--color-text: var(--color-base-content);border:none;cursor:pointer;background:transparent;padding:.5em 1em;box-sizing:border-box;color:var(--color-text);transition:all;transition-duration:.15s}._container_1ymef_59 button:hover{--color-border: var(--color-base-200);--color-bg: rgb(from var(--color-base-0) r g b / 100%);--color-text: var(--color-base-content)}._container_1ymef_59 button:disabled{opacity:50%}._container_1ymef_59 button._btn_1ymef_92{background-color:var(--color-bg);color:var(--color-text);border:solid 1px var(--color-border);padding:.5em 1em;border-radius:.4em;display:inline-flex;justify-content:center;align-items:center}._container_1ymef_59 a{color:var(--color-primary)}._container_1ymef_59 a:hover{color:var(--color-base-content);text-decoration:underline}input{border:solid 1px var(--color-border);color:var(--color-text)}._outter_1ymef_4,._container_1ymef_59,._content_1ymef_120,._backdrop_1ymef_47{transition:all;transition-duration:.15s}._content_1ymef_120{max-width:320px;width:320px;background-color:rgb(from var(--color-base-100) r g b / 60%);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:block;box-sizing:border-box;border-radius:1em;box-shadow:0 14px 47px -13px #0000000d;-webkit-box-shadow:0px 14px 47px -13px rgba(0,0,0,.05);-moz-box-shadow:0px 14px 47px -13px rgba(0,0,0,.05);border:solid 1px rgb(from var(--color-base-200) r g b / 60%)}._content_1ymef_120 ._head_1ymef_139{display:flex;width:100%;justify-content:space-between;align-items:center;padding:1em;box-sizing:border-box}._content_1ymef_120 ._main_1ymef_147{padding:1em 1.5em}._content_1ymef_120 ._foot_1ymef_150{padding:.5em 1em 1.5em;text-align:center;display:flex;justify-content:space-between;align-items:center}._content_1ymef_120 h3{font-size:1.1rem;line-height:1.2rem;padding:0;margin:0}._content_1ymef_120:hover{border:solid 1px rgb(from var(--color-base-200) r g b / 100%)}._captchabox_1ymef_171{display:flex;background-color:var(--color-base-200);justify-content:center;align-items:center;gap:.5em;padding:.5em;border-radius:.5em;width:100%}._svgbox_1ymef_182{width:fit-content}._svgbox_1ymef_182 svg{width:1em;object-fit:contain}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
import { template as C, effect as I, memo as ft, delegateEvents as mt, createComponent as x, Portal as gt, insert as N, className as m, setAttribute as H, render as wt } from "solid-js/web";
import { createSigner as _t } from "@permaweb/aoconnect/browser";
import { createSignal as R, createMemo as pt, createEffect as bt, onCleanup as vt, onMount as xt, batch as it, Switch as Pt, Match as ot, For as Ct } from "solid-js";
function S(s) {
  return s != null && typeof s == "object" && s["@@functional/placeholder"] === !0;
}
function D(s) {
  return function t(e) {
    return arguments.length === 0 || S(e) ? t : s.apply(this, arguments);
  };
}
function kt(s) {
  return function t(e, r) {
    switch (arguments.length) {
      case 0:
        return t;
      case 1:
        return S(e) ? t : D(function(n) {
          return s(e, n);
        });
      default:
        return S(e) && S(r) ? t : S(e) ? D(function(n) {
          return s(n, r);
        }) : S(r) ? D(function(n) {
          return s(e, n);
        }) : s(e, r);
    }
  };
}
function G(s, t) {
  return Object.prototype.hasOwnProperty.call(t, s);
}
var at = Object.prototype.toString, At = /* @__PURE__ */ function() {
  return at.call(arguments) === "[object Arguments]" ? function(t) {
    return at.call(t) === "[object Arguments]";
  } : function(t) {
    return G("callee", t);
  };
}(), qt = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString"), lt = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"], ct = /* @__PURE__ */ function() {
  return arguments.propertyIsEnumerable("length");
}(), Et = function(t, e) {
  for (var r = 0; r < t.length; ) {
    if (t[r] === e)
      return !0;
    r += 1;
  }
  return !1;
}, Rt = /* @__PURE__ */ D(typeof Object.keys == "function" && !ct ? function(t) {
  return Object(t) !== t ? [] : Object.keys(t);
} : function(t) {
  if (Object(t) !== t)
    return [];
  var e, r, n = [], c = ct && At(t);
  for (e in t)
    G(e, t) && (!c || e !== "length") && (n[n.length] = e);
  if (qt)
    for (r = lt.length - 1; r >= 0; )
      e = lt[r], G(e, t) && !Et(n, e) && (n[n.length] = e), r -= 1;
  return n;
}), St = /* @__PURE__ */ kt(function(t, e) {
  for (var r = {}, n = {}, c = 0, l = t.length; c < l; )
    n[t[c]] = 1, c += 1;
  for (var a in e)
    n.hasOwnProperty(a) || (r[a] = e[a]);
  return r;
});
const $t = {
  goldsky: "https://arweave-search.goldsky.com/graphql"
}, ut = "https://workshop.forward.computer", ht = $t.goldsky, Tt = (s) => {
  const t = "ans104";
  return async ({ data: e, tags: r, target: n, anchor: c }) => {
    let l, a;
    const u = new Promise((o) => {
      l = o;
    });
    return s(async (o) => {
      if (a = !0, o.passthrough) return { data: e, tags: r, target: n, anchor: c };
      const { publicKey: f, type: d = 1, alg: w = "rsa-v1_5-sha256" } = o, P = createDataItemBytes(
        e,
        { type: d, publicKey: toView(f) },
        { target: n, tags: r, anchor: c }
      );
      return l(P), await getSignatureData(P);
    }, t).then((o) => {
      if (!a)
        throw new Error("create() must be invoked in order to construct the data to sign");
      if (typeof o == "object" && o.id && o.raw) return o;
      if (!o.signature || !o.signature)
        throw new Error("signer must return its signature and address");
      const { signature: f } = o;
      return u.then((d) => Promise.resolve(f).then(toView).then(async (w) => {
        const P = d;
        if (P.set(w, 2), !await verify(P)) throw new Error("Data Item signature is not valid");
        return {
          /**
           * A data item's ID is the base64url encoded
           * SHA-256 of the signature
           */
          id: await crypto.subtle.digest("SHA-256", w).then((p) => base64url.encode(p)),
          raw: P
        };
      }));
    });
  };
};
function Lt(s) {
  const t = {
    target: s.target,
    anchor: s.anchor ?? "",
    tags: Rt(
      St(
        [
          "Target",
          "target",
          "Anchor",
          "anchor",
          "Data",
          "data",
          "data-protocol",
          "Data-Protocol",
          "variant",
          "Variant",
          "dryrun",
          "Dryrun",
          "Type",
          "type",
          "path",
          "method",
          "signingFormat",
          "signing-format"
        ],
        s
      )
    ).map(function(e) {
      return { name: e, value: s[e] };
    }, s).concat([
      { name: "data-protocol", value: "ao" },
      { name: "type", value: s.type ?? "Message" },
      { name: "variant", value: s.variant ?? "ao.N.1" }
    ]),
    data: s?.data || ""
  };
  return {
    headers: {
      "Content-Type": "application/ans104",
      "codec-device": "ans104@1.0",
      "accept-bundle": "true"
    },
    item: t
  };
}
class dt {
  constructor(t = {}) {
    const { url: e = ut, wallet: r, gql_url: n = ht } = t;
    this.url = e || ut, this.wallet = r, this.gql_url = n || ht;
  }
  fetch = function(t, e) {
    return fetch(this.url + t, e).then((r) => r?.ok && r?.json());
  };
  send = async function(t, e) {
    try {
      let { target: r } = t;
      if (!r) throw new Error("Missed target process");
      let n = _t(e || this.wallet);
      if (!n) throw new Error("Missed singer");
      t["Data-Protocol"] = "ao", t.Variant = "ao.N.1", t.signingFormat = t.signingFormat || "ANS-104";
      const c = Lt(t), l = await Tt(n)(c.item);
      console.log("signedRequest: ", l?.id);
      let a = this.url, u = `/${r}~process@1.0/push/serialize~json@1.0`, h = {
        body: l.raw,
        url: a + u,
        path: u,
        method: "POST",
        headers: c.headers
      };
      const o = await fetch(h.url, {
        method: h.method,
        headers: h.headers,
        body: h.body,
        redirect: "follow"
      });
      if (o.status == 500)
        throw new Error(`${o.status}: ${await o.text()}`);
      if (o.status === 404)
        throw new Error(`${o.status}: ${await o.text()}`);
      if (o.status >= 400)
        throw new Error(`${o.status}: ${await o.text()}`);
      if (o.status >= 300)
        return o;
      const f = await o.json();
      return {
        id: l?.id,
        ...f
      };
    } catch (r) {
      throw r;
    }
  };
  // query = async function(query,options) {
  //   const gql = arGql({endpointUrl: this.gql_url || GQLUrls.goldsky})
  //   let res = await gql.run(query||'');
  //   return res?.data?.transactions?.edges
  // }
}
const Dt = "_outter_1ymef_4", Mt = "_backdrop_1ymef_47", Ut = "_container_1ymef_59", Nt = "_btn_1ymef_92", It = "_content_1ymef_120", Ot = "_head_1ymef_139", Vt = "_main_1ymef_147", Ft = "_foot_1ymef_150", zt = "_captchabox_1ymef_171", Bt = "_svgbox_1ymef_182", g = {
  outter: Dt,
  backdrop: Mt,
  container: Ut,
  btn: Nt,
  content: It,
  head: Ot,
  main: Vt,
  foot: Ft,
  captchabox: zt,
  svgbox: Bt
};
var Ht = /* @__PURE__ */ C('<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24"><g fill=none stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=1.7><path stroke-dasharray=16 stroke-dashoffset=16 d="M12 3c4.97 0 9 4.03 9 9"><animate fill=freeze attributeName=stroke-dashoffset dur=0.645s values=16;0></animate><animateTransform attributeName=transform dur=3.225s repeatCount=indefinite type=rotate values="0 12 12;360 12 12"></animateTransform></path><path stroke-dasharray=64 stroke-dashoffset=64 stroke-opacity=0.3 d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill=freeze attributeName=stroke-dashoffset dur=2.58s values=64;0>');
const yt = (s) => (() => {
  var t = Ht();
  return I((e) => {
    var r = s?.size || "1em", n = s?.size || "1em";
    return r !== e.e && ((e.e = r) != null ? t.style.setProperty("width", r) : t.style.removeProperty("width")), n !== e.t && ((e.t = n) != null ? t.style.setProperty("height", n) : t.style.removeProperty("height")), e;
  }, {
    e: void 0,
    t: void 0
  }), t;
})(), Gt = (s) => {
  let t;
  const [e, r] = R(), n = pt(() => {
    let l = Math.floor(e() / 60 / 60 / 24).toString().padStart(2, "0"), a = Math.floor(e() / 60 / 60 % 24).toString().padStart(2, "0"), u = Math.floor(e() / 60 % 60).toString().padStart(2, "0"), h = Math.floor(e() % 60).toString().padStart(2, "0");
    return l != "00" ? `${l}:${a}:${u}:${h}` : `${a}:${u}:${h}`;
  }), c = () => {
    const l = Date.now(), a = (s?.end - l) / 1e3;
    r(a), t = requestAnimationFrame(c);
  };
  return bt(() => {
    t = requestAnimationFrame(c), vt(() => cancelAnimationFrame(t)), e() && e() <= 0 && s?.onTimeout && s?.onTimeout(e());
  }), ft(n);
};
var Wt = /* @__PURE__ */ C('<svg viewBox="0 0 277 277"fill=none xmlns=http://www.w3.org/2000/svg><path fill-rule=evenodd clip-rule=evenodd d="M119.455 25.881C127.686 10.0406 150.326 10.0388 158.556 25.881L265.485 231.76C273.113 246.446 262.469 264 245.935 264H32.0652C15.5311 264 4.88687 246.446 12.5149 231.76L119.455 25.881ZM139.005 98.5468C132.92 98.5468 127.988 103.485 127.988 109.577V155.615C115.155 160.161 105.952 172.385 105.952 186.789C105.952 205.064 120.751 219.879 139.005 219.879C157.259 219.877 172.059 205.063 172.059 186.789C172.059 172.386 162.854 160.162 150.023 155.615V109.577C150.023 103.486 145.089 98.5486 139.005 98.5468Z"fill=currentColor>');
const Yt = (s) => (() => {
  var t = Wt();
  return t.style.setProperty("height", "1em"), t;
})();
var Kt = /* @__PURE__ */ C("<span>Verifying..."), Zt = /* @__PURE__ */ C("<span>AoCaptcha"), Qt = /* @__PURE__ */ C('<div id=ao-captcha-sdk><div><div><div><p></p><button><svg xmlns=http://www.w3.org/2000/svg width=1em height=1em viewBox="0 0 24 24"><path fill=currentColor d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12L5.293 6.707a1 1 0 0 1 0-1.414"></path></svg></button></div><div><div></div><div>Expired in:</div></div><div><input placeholder="input the code above"type=text required><button></button></div></div></div><div>'), Jt = /* @__PURE__ */ C("<div>loading..."), Xt = /* @__PURE__ */ C("<div><svg xmlns=http://www.w3.org/2000/svg><path fill=currentColor>"), jt = /* @__PURE__ */ C('<svg xmlns=http://www.w3.org/2000/svg width=2em height=2em viewBox="0 0 24 24"><path fill=none stroke=currentColor stroke-dasharray=24 stroke-dashoffset=24 stroke-linecap=round stroke-linejoin=round stroke-width=1.7 d="M5 11l6 6l10 -10"><animate fill=freeze attributeName=stroke-dashoffset dur=0.86s values=24;0>');
function te(s) {
  let t = null, e = null;
  const [r, n] = R(), [c, l] = R(!1), [a, u] = R(!1), [h, o] = R(), [f, d] = R(), w = pt(() => r() != null && f() != null && f()?.length == (r()?.digits || 3)), P = () => {
    w() && (u(!0), t(f()).then((y) => it(() => {
      l(!1), d(null);
    })).catch((y) => {
      console.error(y), o("verify failed"), l(!1);
    }).finally(() => u(!1)));
  };
  return xt(() => {
    s?.ref({
      show: (y, p, M) => {
        t = p, e = M, it(() => {
          u(!1), n(y), d(null), o(null), l(!0);
        });
      },
      close: (y) => {
        l(!1);
      }
    });
  }), vt(() => {
    console.log("aocaptcha is removed");
  }), x(gt, {
    get children() {
      var y = Qt(), p = y.firstChild, M = p.firstChild, O = M.firstChild, k = O.firstChild, Y = k.nextSibling, V = O.nextSibling, F = V.firstChild, $ = F.nextSibling;
      $.firstChild;
      var K = V.nextSibling, _ = K.firstChild, b = _.nextSibling, z = p.nextSibling;
      return k.style.setProperty("display", "flex"), k.style.setProperty("justifyContent", "start"), k.style.setProperty("alignItems", "center"), k.style.setProperty("gap", "0.5em"), N(k, x(Pt, {
        get children() {
          return [x(ot, {
            get when() {
              return a();
            },
            get children() {
              return [x(yt, {}), " ", Kt()];
            }
          }), x(ot, {
            get when() {
              return !a();
            },
            get children() {
              return [x(Yt, {}), " ", Zt()];
            }
          })];
        }
      })), Y.$$click = () => {
        l(!1), e();
      }, N(F, x(Ct, {
        get each() {
          return r()?.paths;
        },
        get fallback() {
          return Jt();
        },
        children: (i) => (() => {
          var A = Xt(), q = A.firstChild, U = q.firstChild;
          return I((v) => {
            var E = g.svgbox, T = i?.[0], L = i?.[1];
            return E !== v.e && m(A, v.e = E), T !== v.t && H(q, "viewBox", v.t = T), L !== v.a && H(U, "d", v.a = L), v;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          }), A;
        })()
      })), $.style.setProperty("font-size", "0.8em"), $.style.setProperty("text-align", "center"), $.style.setProperty("padding-top", "0.2em"), N($, x(Gt, {
        get end() {
          return r()?.timestamp + r()?.duration;
        }
      }), null), _.$$input = (i) => {
        d(i.target.value);
      }, _.style.setProperty("padding", "4px 4px 4px 4px"), _.style.setProperty("min-width", "20px"), _.style.setProperty("min-width", "5em"), _.style.setProperty("font-size", "1.2em"), b.$$click = P, b.style.setProperty("--color-border", "var(--color-primary)"), b.style.setProperty("--color-bg", "var(--color-primary)"), b.style.setProperty("--color-text", "var(--color-primary-content)"), b.style.setProperty("border-radius", "100% 100% 100% 100%"), b.style.setProperty("width", "3em"), b.style.setProperty("height", "3em"), N(b, (() => {
        var i = ft(() => !!a());
        return () => i() ? x(yt, {
          size: "2em"
        }) : jt();
      })()), I((i) => {
        var A = g.outter, q = `${c() ? "visible" : "hidden"}`, U = g.container, v = `${c() ? "0% 0%" : "0% 50%"}`, E = `${c() ? "100" : "0"}`, T = g.content, L = g.head, Z = a(), Q = g.main, J = g.captchabox, X = g.foot, j = g.input, tt = r()?.digits || 3, et = a(), rt = g.btn, nt = !w(), st = g.backdrop, B = `${c() ? "100" : "0"}`;
        return A !== i.e && m(y, i.e = A), q !== i.t && ((i.t = q) != null ? y.style.setProperty("visibility", q) : y.style.removeProperty("visibility")), U !== i.a && m(p, i.a = U), v !== i.o && ((i.o = v) != null ? p.style.setProperty("translate", v) : p.style.removeProperty("translate")), E !== i.i && ((i.i = E) != null ? p.style.setProperty("opacity", E) : p.style.removeProperty("opacity")), T !== i.n && m(M, i.n = T), L !== i.s && m(O, i.s = L), Z !== i.h && (Y.disabled = i.h = Z), Q !== i.r && m(V, i.r = Q), J !== i.d && m(F, i.d = J), X !== i.l && m(K, i.l = X), j !== i.u && m(_, i.u = j), tt !== i.c && H(_, "minlength", i.c = tt), et !== i.w && (_.disabled = i.w = et), rt !== i.m && m(b, i.m = rt), nt !== i.f && (b.disabled = i.f = nt), st !== i.y && m(z, i.y = st), B !== i.g && ((i.g = B) != null ? z.style.setProperty("opacity", B) : z.style.removeProperty("opacity")), i;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0,
        r: void 0,
        d: void 0,
        l: void 0,
        u: void 0,
        c: void 0,
        w: void 0,
        m: void 0,
        f: void 0,
        y: void 0,
        g: void 0
      }), I(() => _.value = f()), y;
    }
  });
}
mt(["click", "input"]);
let W;
wt(() => x(te, {
  ref(s) {
    var t = W;
    typeof t == "function" ? t(s) : W = s;
  }
}), document.body);
class se {
  constructor(t, e) {
    this.process = t, this.recipient = e?.recipient || e?.Recipient, this.type = e?.type || e?.Type || "DEFAULT", this.wallet = e?.wallet || e?.Wallet, this.latest_request = null, this.MU_URL = e?.ao?.MU_URL || "https://mu.ao-testnet.xyz", this.CU_URL = e?.ao?.CU_URL || "https://cu.ao-testnet.xyz", this.GATEWAY_URL = e?.ao?.GATEWAY_URL || "https://arweave.net", this.MODE = e?.ao?.GATEWAY_URL || "legacy", this.URL = "http://node.arweaveoasis.com:8734";
  }
  m = async (t, e, r) => {
    try {
      return this.wallet || reject("missed wallet"), this.hb = new dt({
        url: this.URL,
        wallet: this.wallet
      }), await this.hb.send({
        target: t,
        data: r || "",
        ...e
      }, this.wallet);
    } catch (n) {
      throw n;
    }
  };
  getLatestRequest() {
    return this.latest_request;
  }
  request(t, e) {
    return new Promise(async (r, n) => {
      const c = Date.now();
      if (this.wallet = e || this.wallet, this.recipient = t.recipient || t.Recipient || this.recipient, this.type = t["Request-Type"] || t?.type || t?.Type || this.type || "DEFAULT", this.process || n("missed the captcha process id"), this.recipient || n("missed the request process id"), this.wallet || n("missed wallet"), this.latest_request && c - this.latest_request?.timestamp < this.latest_request.duration) {
        r(this.latest_request);
        return;
      }
      t.Action = "Request-Captcha", t.Recipient = t.Recipient || this.recipient, t["Request-Type"] = t["Request-Type"] || this.type;
      const {
        id: l,
        outbox: a
      } = await this.m(this.process, t, "a aocaptcha request").catch((u) => n(u));
      if (a?.["1"]) {
        const {
          Data: u,
          ...h
        } = a?.["1"], o = {
          id: l,
          paths: u && JSON.parse(u),
          timestamp: Number(h["Request-Time"]),
          duration: Number(h["Request-Duration"]),
          type: h["Captcha-Type"],
          digits: Number(h["Captcha-Digits"]),
          request_type: h["Request-Type"],
          recipient: this.recipient
        };
        console.log("request sucessed: ", l), this.latest_request = o, r(o);
      } else
        throw new Error("fetch captcha faild.");
    });
  }
  verify(t, e) {
    return new Promise(async (r, n) => {
      const c = Date.now();
      this.wallet = e || this.wallet, this.process || n("missed the captcha process id"), t || n("missed request data."), t.paths || n("missed captcha data."), (!t.timestamp || t?.timestamp + t?.duration < c) && n("the captcha is expired."), !this.wallet && !e && n("missed wallet"), W.show(t, async (l) => {
        try {
          const a = {
            Action: "Verify-Captcha",
            "Request-Id": t?.id,
            "Pushed-For": t?.id,
            "App-Name": "AoCaptcha"
          }, {
            id: u,
            outbox: h
          } = await this.m(this.process, a, l).catch((d) => n(d)), f = await (this.hb || new dt({
            url: this.URL
          })).fetch(`/${t?.recipient}~process@1.0/compute&id=${u}/results/serialize~json@1.0`);
          if (h?.["1"]) {
            const d = h?.["1"], w = {
              id: d["Verify-Id"] || u,
              request_id: d["Request-Id"],
              request_time: d["Request-Time"],
              request_type: d["Request-Type"],
              verified_time: d["Verified-Time"],
              verified: !0,
              result: f
            };
            return console.log("verify sucessed: ", w?.id), this.latest_request = null, r(w), w;
          } else
            throw n("verify failed"), this.latest_request = null, "failed";
        } catch (a) {
          throw a;
        }
      }, () => {
        n("cancelled");
      });
    });
  }
}
export {
  se as AoCaptcha
};
