## 依赖安装说明

pnpm create vite ;#React typescript
pnpm install sass -D

// 为避免类型报错，你需要通过 `pnpm i @types/node -D` 安装类型
pnpm i @types/node -D #解决 import “path”类型报错

//用来自动为不同的目标浏览器添加样式前缀，解决的是浏览器兼容性的问题。
pnpm i autoprefixer -D

pnpm install postcss -D

//用于压缩图片的插件
pnpm i vite-plugin-imagemin -D

- 总之，vite 依赖预构建主要做了两件事情：
- 一是将其他格式(如 UMD 和 CommonJS)的产物转换为 ESM 格式，使其在浏览器通过 <script type="module"><script>的方式正常加载。
- 二是打包第三方库的代码，将各个第三方库分散的文件合并到一起，减少 HTTP 请求数量，避免页面加载性能劣化。

- 怎样通过 Vite 提供的配置项来定制预构建的过程。Vite 将预构建相关的配置项都集中在 optimizeDeps 属性上
