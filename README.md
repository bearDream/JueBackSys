## 介绍
基于 vue-cli + iView 的 Vue js 后台管理系统，在 vue-cli 基础上做了一些合理的修改和增强。功能包括：调试、构建、代码规范校验、单元测试、国际化等。

## 贴士
本项目的初衷是整理一套通用的 Vue js 单页应用模板，由于近期项目需要，才加入 iView。但是，你可以很轻松地从本项目中剥离 iView，获取一套通用的 Vue js 单页应用模板，或者加入其它 Vue js 的 UI 组件库。
> 如何剥离 iView？去除 [加入 iView 组件库](https://github.com/zhaotoday/vue.js#加入-iview-组件库) 的相关操作即可。

## 技术栈
Vue、Webpack、ES6、vue-router、Vuex、Sass、PostCSS 等。

## 网址
- [Vue.js 中文网](https://cn.vuejs.org/)
- [iView - 一套基于 Vue.js 的高质量 UI 组件库](https://www.iviewui.com/)
- [vue-router 中文网](http://router.vuejs.org/zh-cn/)
- [Vuex 中文网](https://vuex.vuejs.org/zh-cn/)
- [Vuex 通俗版教程](https://yeaseonzhang.github.io/2017/03/16/Vuex-%E9%80%9A%E4%BF%97%E7%89%88/)
- [Vuex 购物车示例](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)
- [Vue2.0 实践阶段性分享](https://segmentfault.com/a/1190000007909108)
- [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)
- [vue-devtools](https://github.com/vuejs/vue-devtools)

## 相关
- [AJAX 简单封装及使用规范](https://github.com/zhaotoday/rest)
- [基于 i18next 实现 Vue js 项目的国际化（整理中）](https://github.com/zhaotoday/i18n)
- [基于 CodeIgniter 的轻量级 PHP MVC 框架](https://github.com/zhaotoday/php-rich-app)
- [老版本的浏览器上访问时提示升级](https://github.com/zhaotoday/update-your-browser)

## 使用
```bash
# 下载代码
$ git clone https://github.com/zhaotoday/vue.js.git

# 安装依赖
$ npm install

# 安装mock和json-server
$ npm install --save-dev mock json-server

# 安装 node-sass、sass-loader
$ npm install --save-dev node-sass sass-loader

# 开发调试
$ npm run dev

# 构建
$ npm run build

# 执行单元测试
$ npm run unit

# 执行 e2e 测试
$ npm run e2e

# 执行所有测试
$ npm test
```

## 对 vue-cli 的一些修改和增强
#### 1. 将模板文件 index.html 从根目录移至 src 目录，将构建文件 index.html 移至根目录
理由：原 vue-cli 构建后的 index.html 存放在 dist 目录下。但通常，我们需要把整个项目提交到 git/svn，然后部署，这时候访问的默认首页需要是构建后的 index.html。

#### 2. 提供 Sass 支持
```bash
# 安装 node-sass、sass-loader
$ npm install --save-dev node-sass sass-loader
```
```html
<!-- 引入样式 -->
<style lang="scss" scoped src="./theme/styles/index.scss">
</style>
```

#### 3. [可选] 引入全局样式和 Sass 工具集合
/src/main.js：
```js
// 引入全局样式
import './theme/global/index.scss'
```
/{path}/{to}/MyComponent/theme/styles/index.scss：
```sass
/* 引入 Sass 工具集合 */
@import "../../../theme/utils/index";
```

#### 4. 用 axios 作为 ajax 方案
官方已经不推荐 vue-resource 作为 ajax 方案，请用 axios 代替。
```bash
# 安装 axios
$ npm install --save axios
```
[链接](https://github.com/vuefe/vuefe.github.io/issues/186)、[链接](https://github.com/zhaotoday/rest)

#### 5. 添加 polyfill
按需引入 polyfill，提高浏览器兼容性。
```bash
# 安装 core-js
$ npm install --save core-js
```
polyfill 在 /src/utils/polyfill.js 文件中引入：
```js
import 'core-js/es6/promise'
```

#### 6. 用 Vuex 做状态管理
```bash
# 安装 vuex
$ npm install --save vuex
```
[链接](https://vuex.vuejs.org/zh-cn/structure.html)

## 项目结构
```
|-- build                            // Webpack 项目构建
|-- config                           // 项目开发环境配置
|-- src                              // 源码目录
|   |-- app                          // 业务代码
|       |-- Articles                 // 文章业务模块
|       |-- Home                     // 首页
|       |-- Layout                   // 页面布局结构（除登录页外）
|       |-- Login                    // 登录页
|       |-- NotFound                 // 404 页
|       |-- Root                     // 根页面
|       |-- Unauthorized             // 未授权页面（在开发权限相关系统时有用）
|   |-- components                   // 公共组件
|   |-- i18n                         // 全局国际化
|   |-- models                       // 数据模型（主要在 store 中用到）
|   |-- router                       // 路由配置
|       |-- routes                   // 各业务模块路由配置
|   |-- store                        // Vuex 状态管理
|       |-- actions.js               // 根级别的 actions
|       |-- getters.js               // 根级别的 getters
|       |-- mutations.js             // 根级别的 mutations
|       |-- types.js                 // 根级别的 mutation types
|       |-- modules                  // 各业务模块的局部状态管理
|           |-- articles             // 文章业务模块状态管理
|   |-- theme                        // 皮肤
|       |-- global                   // 全局样式
|       |-- utils                    // Sass 工具集合（如：vars、mixin、function 等）
|       |-- iview                    // 第三方 UI 库的样式（如：iView 等）
|   |-- utils                        // 工具集合
|       |-- helpers                  // 帮助函数集合
|       |-- mixins                   // 混合
|       |-- auth.js                  // 权限相关
|       |-- env.js                   // 环境配置类
|       |-- fastclick.js             // 全局处理移动端 onclick 事件的延迟 300 ms 问题（仅移动端需要引入）
|       |-- consts.js                // 常量配置
|       |-- i18n.js                  // 国际化类
|       |-- init.js                  // 初始化
|       |-- polyfill.js              // polyfill
|       |-- rest.js                  // RESTful 请求类
|   |-- App.vue                      // 页面入口
|   |-- main.js                      // 程序入口，加载各种公共组件
|-- static                           // 静态文件，如：图片、JSON 数据等
|-- .babelrc                         // babel-loader 配置
|-- .editorconfig                    // 定义代码格式
|-- package.json                     // 项目基本信息
```

## 组件的命名规范
按照 vue-cli 的 Hello 示例，组件（这里说的是组件文件夹）命名应遵循帕斯卡（pascal）命名法，如：MyComponent。
> 当然，也有很多人喜欢命名成 my-component 的形式。这个规范不是强制性的，你可以选一种适合自己的。

## 公用组件规范
公用组件放在 /src/components 下。
```
|-- src                              // 源码目录
|   |-- components                   // 公用组件
|       |-- MyComponent              // MyComponent 组件
|           |-- index.vue            // MyComponent 的入口
|           |-- theme                // MyComponent 的皮肤
|               |-- images           // MyComponent 的图片
|               |-- styles           // MyComponent 的样式
|                   |-- index.scss   // MyComponent 的样式入口
|           |-- utils                // MyComponent 的工具集合
|           |-- i18n                 // MyComponent 的国际化
|           |-- components           // MyComponent 的子组件
|               |-- ChildComponent   // MyComponent 的子组件 ChildComponent，组件规范和 MyComponent 一致
```

## 业务组件规范
业务组件放在 /src/app 下，也就是一个页面，对应一个路由。规范和公用组件一直。

## 加入 iView 组件库
#### 1. 提供 less 支持
```bash
# 安装 less-loader、less
$ npm install --save-dev less-loader less
```

#### 2. 自定义 iView 的主题
新建 /theme/global/index.less：
```less
@import '~iview/src/styles/index.less';
/* 接下来开始覆盖 less 变量 */
```
[链接](https://www.iviewui.com/docs/guide/theme)

#### 3. 引入 iView
编辑 /src/main.js：
```js
import iView from 'iview'
import './theme/iview/index.less'
```

#### 4. 低版本 IE（IE9 及以下）访问时提示升级浏览器
原因：
- [官网原话]Vue.js 不支持 IE8 及其以下版本，因为 Vue.js 使用了 IE8 不能模拟的 ECMAScript 5 特性。 Vue.js 支持所有兼容 ECMAScript 5 的浏览器；
- 为了更好的支持 CSS3（IE10 开始支持较好），放弃对 IE9 的兼容；
- 用户在 IE9 及以下访问时给出升级浏览器提示，不至于让用户不知所措。
```bash
# 下载代码
$ git clone https://github.com/zhaotoday/update-your-browser.git
```
```html
<!-- 放在页面开头位置 -->
<script src="static/update-browser/scripts/bowser.js"></script>
<script>
  if (!((bowser.msie && bowser.version >= 10) || bowser.msedge || bowser.webkit || bowser.firefox))
    location.replace('static/update-browser/index.html')
</script>
```

## 项目地址
https://github.com/zhaotoday/iview

## 线上的例子
http://admin.liruan.cn/#/login
```
用户：admin
密码：admin
```
