import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // imports: ['vue', 'vue-router'],
      // resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', '@vueuse/core'], // 自动导入vue和vue-router相关函数
      dts: 'src/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
    }),
    Components({
      // resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
    Unocss(),
  ],
  server: {
    https: false,
    open: true,
    port: 8080,
    fs: {
      strict: true,
    },
    // proxy: {
    //   '^/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '/'),
    //   },
    // },
  },
})
