import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [cssInjectedByJsPlugin(),solid()],
  build: {
    lib: {
      entry: "src/index.jsx",
      name: "AoCaptchaSDK",
      fileName: "index",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["solid-js", "solid-js/web","@permaweb/aoconnect","@permaweb/aoconnect/browser"], // 不打包 solid
    }
  },
  server: {
    allowedHosts: true
  }
})
