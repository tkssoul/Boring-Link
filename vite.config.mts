// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Layouts from "vite-plugin-vue-layouts";
import Vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import compression from "vite-plugin-compression";

// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Boring-Link/",
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    AutoImport({
      imports: [
        "vue",
        {
          "vue-router/auto": ["useRoute", "useRouter"],
        },
      ],
      dts: "src/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: "src/components.d.ts",
    }),
    Fonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
    Layouts(),
    VueRouter({
      dts: "src/typed-router.d.ts",
    }),

    // 添加 gzip 压缩插件
    compression({
      verbose: true,
      disable: false,
      threshold: 5120,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  define: {
    "process.env": {},
    "import.meta.env": {
      VITE_APP_ENV: process.env.VITE_APP_ENV || "production",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    // 指定输出目录
    outDir: "docs", // 可以改成任意路径，例如 '../dist' 或 '/opt/homebrew/var/www/boringlink_dist'

    // 确保摇树优化生效
    target: "esnext",
    rollupOptions: {
      // 确保外部化处理那些不需要打包的依赖
      external: ["echarts"],
      output: {
        // 根据包名分块
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            // 将所有的 Vue 相关依赖打包成一个大包
            if (id.includes("vue") || id.includes("vuetify")) {
              return "vue-vendor";
            }
            // Echarts 相关依赖单独打包
            if (id.includes("echarts") || id.includes("zrender")) {
              return "echarts-vendor";
            }
            // 将动画相关依赖打包到一起
            if (id.includes("gsap")) {
              return "gsap-vendor";
            }
            // 将图表相关依赖打包到一起
            if (id.includes("echarts")) {
              return "echarts-vendor";
            }
            // 其他依赖打包到 vendors
            return "vendors";
          }
          // 路由组件单独打包
          if (id.includes("/pages/")) {
            const matches = id.match(/\/pages\/([^/]+)/);
            if (matches) {
              return `page-${matches[1]}`;
            }
          }
        },
        // 用于从入口点创建的块的打包输出格式
        entryFileNames: "assets/[name].[hash].js",
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: "assets/[name].[hash].js",
        // 用于输出静态资源的命名
        assetFileNames: "assets/[name].[hash].[ext]",
      },
      treeshake: {
        // 确保 tree shaking 生效
        moduleSideEffects: true,
        // 去除无用的代码
        tryCatchDeoptimization: false,
        // 确保 proper dead code elimination
        propertyReadSideEffects: false,
      },
    },
    // 生成 manifest.json 用于资源映射
    manifest: true,
    // 启用源码映射
    sourcemap: false,
    // 设置块大小警告的限制
    chunkSizeWarningLimit: 1000,
    // 压缩选项
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        // 删除所有无用的代码
        dead_code: true,
        // 删除未使用的变量
        unused: true,
        // 对 if 进行优化
        if_return: true,
        // 优化 if 中的条件判断
        collapse_vars: true,
      },
      mangle: {
        toplevel: true, // 尝试压缩顶层变量
      },
    },
  },
  esbuild: {
    // 确保 tree shaking 生效
    treeShaking: true,
  },
});
