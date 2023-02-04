import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
import path from 'path';
// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
// 自动引入方案
import { normalizePath } from 'vite';
import autoprefixer from 'autoprefixer';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
// 压缩图片插件
import viteImagemin from 'vite-plugin-imagemin';

const variablePath = normalizePath(
  path.resolve(__dirname, './src/variable.scss')
);

// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'xxxxxx';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, './src'),
  publicDir: path.resolve(__dirname, './public'),
  resolve: {
    // 别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  //配置生产环境下cdn引用时的自动化的方式来实现地址的替换
  base: isProduction ? CDN_URL : '/',
  json: {
    // 禁用json按名导入的方式
    // 这样会将 JSON 的内容解析为export default JSON.parse("xxx")
    stringify: true
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 20', 'ff > 10', 'ie 10']
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
    //css module 方案
    // modules: {
    //   // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
    //   // 其中，name 表示当前文件名，local 表示类名
    //   generateScopedName: "[name]_[local]_[hash:base64:5]",
    // },
  },
  plugins: [
    react({
      // babel: {
      // plugins: [
      //   // 适配 styled-component
      //   'babel-plugin-styled-components',
      //   // 适配 emotion
      //   '@emotion/babel-plugin'
      // ]
      // },
      // 注意: 对于 emotion，需要单独加上这个配置
      // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
      // jsxImportSource: '@emotion/react'
    }),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: '/windicss|node_modules/'
    }),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],
  build: {
    // 8 KB
    // 决定资源是否打包成单文件的最小体积
    assetsInlineLimit: 8 * 1024
  },
  optimizeDeps: {
    include: [
      // 可以通过include参数提前声明需要按需加载的依赖:避免运行时的二次预构建
    ],
    exclude: [
      // 用于将某些依赖从预构建的过程中排除。
    ],
    // Vite 提供了esbuildOptions 参数来让我们自定义 Esbuild 本身的配置
    // 常用的场景是加入一些 Esbuild 插件:
    esbuildOptions: {
      // 这个配置主要是处理一些特殊情况，如某个第三方包本身的代码出现问题了。
      plugins: []
    }
  }
});
