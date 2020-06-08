(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{323:function(e,a,o){"use strict";o.r(a),a.default='<p>在<a href="https://en.wikipedia.org/wiki/Modular_programming">模块化编程</a>中，开发者将程序分解为功能离散的 chunk，并称之为 <strong>模块</strong>。</p>\n<p>每个模块都拥有小于完整程序的体积，使得验证、调试及测试变得轻而易举。\n精心编写的 <strong>模块</strong>提供了可靠的抽象和封装界限，使得应用程序中每个模块都具备了条理清晰的设计和明确的目的。</p>\n<p>Node.js 从一开始就支持模块化编程。\n然而，web 的<em>模块化</em>正在缓慢支持中。\n在 web 界存在多种支持 JavaScript 模块化的工具，这些工具各有优势和限制。\nwebpack 从这些系统中汲取了经验和教训，并将<em>模块</em>的概念应用到项目的任何文件中。</p>\n<h2 id="何为-webpack-模块">何为 webpack 模块<a href="#%E4%BD%95%E4%B8%BA-webpack-%E6%A8%A1%E5%9D%97" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>与 <a href="https://nodejs.org/api/modules.html">Node.js 模块</a>相比，webpack <em>模块</em>能以各种方式表达它们的依赖关系。下面是一些示例：</p>\n<ul>\n<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import">ES2015 <code>import</code></a> 语句</li>\n<li><a href="http://www.commonjs.org/specs/modules/1.0/">CommonJS</a> <code>require()</code> 语句</li>\n<li><a href="https://github.com/amdjs/amdjs-api/blob/master/AMD.md">AMD</a> <code>define</code> 和 <code>require</code> 语句</li>\n<li>css/sass/less 文件中的 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@import"><code>@import</code> 语句</a>。</li>\n<li>stylesheet <code>url(...)</code> 或者 HTML <code>&#x3C;img src=...></code> 文件中的图片链接。</li>\n</ul>\n<h2 id="支持的模块类型">支持的模块类型<a href="#%E6%94%AF%E6%8C%81%E7%9A%84%E6%A8%A1%E5%9D%97%E7%B1%BB%E5%9E%8B" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>通过 <em>loader</em> 可以使 webpack 支持多种语言和预处理器语法编写的模块。<em>loader</em> 描述了 webpack <strong>如何</strong> 处理非 JavaScript <em>模块</em>，并将相关<em>依赖</em>引入你的 <em>bundle</em> 中。\nwebpack 社区已经为各种流行的语言和预处理器创建了 <em>loader</em>，其中包括：</p>\n<ul>\n<li><a href="http://coffeescript.org">CoffeeScript</a></li>\n<li><a href="https://www.typescriptlang.org">TypeScript</a></li>\n<li><a href="https://babeljs.io">ESNext (Babel)</a></li>\n<li><a href="http://sass-lang.com">Sass</a></li>\n<li><a href="http://lesscss.org">Less</a></li>\n<li><a href="http://stylus-lang.com">Stylus</a></li>\n<li><a href="https://elm-lang.org/">Elm</a></li>\n</ul>\n<p>当然还有更多！总得来说，webpack 提供了可定制，强大且丰富的 API，允许在 <strong>任何技术栈</strong> 中使用，同时支持在开发、测试和生产环境的工作流中做到 <strong>无侵入性</strong>。</p>\n<p>关于 loader 的相关信息，请参考 <a href="/loaders"><strong>loader 列表</strong></a> 或 <a href="/api/loaders"><strong>自定义 loader</strong></a>。</p>\n'}}]);