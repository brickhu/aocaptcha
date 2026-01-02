import { defineConfig } from 'vite'
import { resolve } from 'path'
import solid from 'vite-plugin-solid'
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    solid(),
    nodePolyfills({
      // Enable specific polyfills
      include: ['buffer', 'process', 'util', 'stream', 'crypto'],
      globals: {
        Buffer: true,
        process: true,
      },
      protocolImports: true,
    })
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  resolve : {
    alias : {
      "aocaptcha-sdk" : resolve(__dirname, '../sdk/src')
    }
  }
})
