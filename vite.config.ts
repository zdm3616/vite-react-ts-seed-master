import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { envAddress } from './config.json'
const defaultProxyList = Object.keys(envAddress).reduce((pre, cur) => {
  pre[`/${cur}/api/${cur}`] = {
    target: 'http://168.61.101.82',
    changeOrigin: true,
  }
  return pre
}, {})
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      ...defaultProxyList,
      '/new': {
        target: 'http://www.ggapi.cn/api',
        changeOrigin: true,
      },
    },
  },
})
