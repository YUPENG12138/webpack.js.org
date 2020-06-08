(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{382:function(n,s,a){"use strict";a.r(s),s.default='<p><em>tree shaking</em> 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 <a href="http://exploringjs.com/es6/ch_modules.html#static-module-structure">静态结构</a> 特性，例如 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import"><code>import</code></a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export"><code>export</code></a>。这个术语和概念实际上是由 ES2015 模块打包工具 <a href="https://github.com/rollup/rollup">rollup</a> 普及起来的。</p>\n<p>webpack 2 正式版本内置支持 ES2015 模块（也叫做 <em>harmony modules</em>）和未使用模块检测能力。新的 webpack 4 正式版本扩展了此检测能力，通过 <code>package.json</code> 的 <code>"sideEffects"</code> 属性作为标记，向 compiler 提供提示，表明项目中的哪些文件是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。</p>\n<blockquote class="tip">\n<p>本指南的继承自 <a href="/guides/getting-started">起步</a> 指南。如果你尚未阅读该指南，请先行阅读。</p>\n</blockquote>\n<h2 id="添加一个通用模块">添加一个通用模块<a href="#%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E9%80%9A%E7%94%A8%E6%A8%A1%E5%9D%97" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>在我们的项目中添加一个新的通用模块文件 <code>src/math.js</code>，并导出两个函数：</p>\n<p><strong>project</strong></p>\n<pre><code class="hljs language-diff">webpack-demo\n|- package.json\n|- webpack.config.js\n|- /dist\n  |- bundle.js\n  |- index.html\n|- /src\n  |- index.js\n<span class="token inserted">+ |- math.js</span>\n|- /node_modules</code></pre>\n<p><strong>src/math.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">square</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">cube</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> x <span class="token operator">*</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<p>需要将 <code>mode</code> 配置设置成<a href="/configuration/mode/#mode-development">development</a>，以确定 bundle 不会被压缩：</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-diff">const path = require(\'path\');\n\nmodule.exports = {\n  entry: \'./src/index.js\',\n  output: {\n    filename: \'bundle.js\',\n    path: path.resolve(__dirname, \'dist\'),\n  },\n<span class="token inserted">+ mode: \'development\',</span>\n<span class="token inserted">+ optimization: {</span>\n<span class="token inserted">+   usedExports: true,</span>\n<span class="token inserted">+ },</span>\n};</code></pre>\n<p>配置完这些后，更新入口脚本，使用其中一个新方法，并且为了简化示例，我们先将 <code>lodash</code> 删除：</p>\n<p><strong>src/index.js</strong></p>\n<pre><code class="hljs language-diff"><span class="token deleted">- import _ from \'lodash\';</span>\n<span class="token inserted">+ import { cube } from \'./math.js\';</span>\n\n  function component() {\n<span class="token deleted">-   const element = document.createElement(\'div\');</span>\n<span class="token inserted">+   const element = document.createElement(\'pre\');</span>\n\n<span class="token deleted">-   // Lodash, now imported by this script</span>\n<span class="token deleted">-   element.innerHTML = _.join([\'Hello\', \'webpack\'], \' \');</span>\n<span class="token inserted">+   element.innerHTML = [</span>\n<span class="token inserted">+     \'Hello webpack!\',</span>\n<span class="token inserted">+     \'5 cubed is equal to \' + cube(5)</span>\n<span class="token inserted">+   ].join(\'\\n\\n\');</span>\n\n    return element;\n  }\n\n  document.body.appendChild(component());</code></pre>\n<p>注意，我们<strong>没有从 <code>src/math.js</code> 模块中 <code>import</code> 另外一个 <code>square</code> 方法</strong>。这个函数就是所谓的“未引用代码(dead code)”，也就是说，应该删除掉未被引用的 <code>export</code>。现在运行 npm script <code>npm run build</code>，并查看输出的 bundle：</p>\n<p><strong>dist/bundle.js (around lines 90 - 100)</strong></p>\n<pre><code class="hljs language-js"><span class="token comment">/* 1 */</span>\n<span class="token comment">/***/</span> <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>module<span class="token punctuation">,</span> __webpack_exports__<span class="token punctuation">,</span> __webpack_require__<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token string">\'use strict\'</span><span class="token punctuation">;</span>\n  <span class="token comment">/* unused harmony export square */</span>\n  <span class="token comment">/* harmony export (immutable) */</span> __webpack_exports__<span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">]</span> <span class="token operator">=</span> cube<span class="token punctuation">;</span>\n  <span class="token keyword">function</span> <span class="token function">square</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">function</span> <span class="token function">cube</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> x <span class="token operator">*</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>注意，上面的 <code>unused harmony export square</code> 注释。如果你观察它下面的代码，你会注意到虽然我们没有引用 <code>square</code>，但它仍然被包含在 bundle 中。我们将在下一节解决这个问题。</p>\n<h2 id="将文件标记为-side-effect-free无副作用">将文件标记为 side-effect-free(无副作用)<a href="#%E5%B0%86%E6%96%87%E4%BB%B6%E6%A0%87%E8%AE%B0%E4%B8%BA-side-effect-free%E6%97%A0%E5%89%AF%E4%BD%9C%E7%94%A8" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>在一个纯粹的 ESM 模块世界中，很容易识别出哪些文件有 side effect。然而，我们的项目无法达到这种纯度，所以，此时有必要提示 webpack compiler 哪些代码是“纯粹部分”。</p>\n<p>通过 package.json 的 <code>"sideEffects"</code> 属性，来实现这种方式。</p>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"your-project"</span><span class="token punctuation">,</span>\n  <span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token boolean">false</span>\n<span class="token punctuation">}</span></code></pre>\n<p>如果所有代码都不包含 side effect，我们就可以简单地将该属性标记为 <code>false</code>，来告知 webpack，它可以安全地删除未用到的 export。</p>\n<blockquote class="tip">\n<p>"side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。</p>\n</blockquote>\n<p>如果你的代码确实有一些副作用，可以改为提供一个数组：</p>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"your-project"</span><span class="token punctuation">,</span>\n  <span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token string">"./src/some-side-effectful-file.js"</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n<p>数组方式支持相对路径、绝对路径和 glob 模式匹配相关文件。它在内部使用 <a href="https://github.com/micromatch/micromatch#matching-features">micromatch</a>。</p>\n<blockquote class="tip">\n<p>注意，所有导入文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 <code>css-loader</code> 并 import 一个 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：</p>\n</blockquote>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"your-project"</span><span class="token punctuation">,</span>\n  <span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token string">"./src/some-side-effectful-file.js"</span><span class="token punctuation">,</span>\n    <span class="token string">"*.css"</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n<p>最后，还可以在 <a href="/configuration/module/#module-rules"><code>module.rules</code> 配置选项</a> 中设置 <code>"sideEffects"</code>。</p>\n<h2 id="解释-tree-shaking-和-sideeffects">解释 tree shaking 和 <code>sideEffects</code><a href="#%E8%A7%A3%E9%87%8A-tree-shaking-%E5%92%8C-sideeffects" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p><a href="/configuration/optimization/#optimizationsideeffects"><code>sideEffects</code></a> 和 <a href="/configuration/optimization/#optimizationusedexports"><code>usedExports</code></a>（更多被认为是 tree shaking）是两种不同的优化方式。</p>\n<p><strong><code>sideEffects</code> 更为有效</strong> 是因为它允许跳过整个模块/文件和整个文件子树。</p>\n<p><code>usedExports</code> 依赖于 <a href="https://github.com/terser-js/terser">terser</a> 去检测语句中的副作用。它是一个 JavaScript 任务而且没有像 <code>sideEffects</code> 一样简单直接。而且它不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的。</p>\n<p>让我们来看一个例子：</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> Button <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'@shopify/polaris\'</span><span class="token punctuation">;</span></code></pre>\n<p>打包前的文件版本看起来是这样的：</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">import</span> hoistStatics <span class="token keyword">from</span> <span class="token string">\'hoist-non-react-statics\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">Button</span><span class="token punctuation">(</span>_ref<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> _final <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> _len <span class="token operator">=</span> arguments<span class="token punctuation">.</span>length<span class="token punctuation">,</span> objs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>_len<span class="token punctuation">)</span><span class="token punctuation">,</span> _key <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> _key <span class="token operator">&#x3C;</span> _len<span class="token punctuation">;</span> _key<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    objs<span class="token punctuation">[</span>_key<span class="token punctuation">]</span> <span class="token operator">=</span> arguments<span class="token punctuation">[</span>_key<span class="token punctuation">]</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> _i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> _objs <span class="token operator">=</span> objs<span class="token punctuation">;</span> _i <span class="token operator">&#x3C;</span> _objs<span class="token punctuation">.</span>length<span class="token punctuation">;</span> _i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> obj <span class="token operator">=</span> _objs<span class="token punctuation">[</span>_i<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token function">mergeRecursively</span><span class="token punctuation">(</span>_final<span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">return</span> _final<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">withAppProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">addProvider</span><span class="token punctuation">(</span>WrappedComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> WithProvider <span class="token operator">=</span>\n    <span class="token comment">/*#__PURE__*/</span>\n    <span class="token keyword">function</span> <span class="token punctuation">(</span>_React$Component<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// ...</span>\n      <span class="token keyword">return</span> WithProvider<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">(</span>Component<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    WithProvider<span class="token punctuation">.</span>contextTypes <span class="token operator">=</span> WrappedComponent<span class="token punctuation">.</span>contextTypes <span class="token operator">?</span> <span class="token function">merge</span><span class="token punctuation">(</span>WrappedComponent<span class="token punctuation">.</span>contextTypes<span class="token punctuation">,</span> polarisAppProviderContextTypes<span class="token punctuation">)</span> <span class="token punctuation">:</span> polarisAppProviderContextTypes<span class="token punctuation">;</span>\n    <span class="token keyword">var</span> FinalComponent <span class="token operator">=</span> <span class="token function">hoistStatics</span><span class="token punctuation">(</span>WithProvider<span class="token punctuation">,</span> WrappedComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> FinalComponent<span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">var</span> Button$<span class="token number">1</span> <span class="token operator">=</span> <span class="token function">withAppProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Button<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...,</span>\n  Button$<span class="token number">1</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>当 <code>Button</code> 没有被使用，你可以有效地清除掉 <code>export { Button$1 };</code> 且保留所有剩下的代码。那问题来了，“这段代码会有任何副作用或它能被安全都清理掉吗？”。很难说，尤其是这 <code>withAppProvider()(Button)</code> 这段代码。<code>withAppProvider</code> 被调用，而且返回的值也被调用。当调用 <code>merge</code> 或 <code>hoistStatics</code> 会有任何副作用吗？当给 <code>WithProvider.contextTypes</code> (Setter?) 赋值或当读取 <code>WrappedComponent.contextTypes</code> (Getter) 的时候，会有任何副作用吗？</p>\n<p>实际上，Terser 尝试去解决以上的问题，但在很多情况下，它不太确定。但这不会意味着 terser 由于无法解决这些问题而运作得不好，而是\b由于在 JavaScript 这种动态语言中实在太难去确定。</p>\n<p>但我们可以通过 <code>/*#__PURE__*/</code> 注释来帮忙 terser。它给一个语句标记为没有副作用。就这样一个简单的改变就能够使下面的代码被 tree-shake:</p>\n<p><code>var Button$1 = /*#__PURE__*/ withAppProvider()(Button);</code></p>\n<p>这样会允许去掉这代码代码，但仍然会有一些导入的问题需要被包括/评估，因为它们包含了副作用。</p>\n<p>为了解决这个问题，我们使用在 <code>package.json</code> 中<a href="/guides/tree-shaking/#mark-the-file-as-side-effect-free"><code>"sideEffects"</code></a> 属性。</p>\n<p>它类似于 <code>/*#__PURE__*/</code> 但是作用于模块的层面，而不是代码语句的层面。它表示的意思是(指<code>"sideEffects"</code> 属性)：“如果被标记为无副作用的模块没有被直接导出使用，打包工具会跳过进行模块的副作用分析评估。”。</p>\n<p>在一个 <code>Shopify Polaris</code> 的例子，原有的模块如下：</p>\n<p><strong>index.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token keyword">import</span> <span class="token string">\'./configure\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">\'./types\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">\'./components\'</span><span class="token punctuation">;</span></code></pre>\n<p><strong>components/index.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token comment">// ...</span>\n<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> Breadcrumbs <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./Breadcrumbs\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> Button<span class="token punctuation">,</span> buttonFrom<span class="token punctuation">,</span> buttonsFrom<span class="token punctuation">,</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./Button\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> ButtonGroup <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./ButtonGroup\'</span><span class="token punctuation">;</span>\n<span class="token comment">// ...</span></code></pre>\n<p><strong>package.json</strong></p>\n<pre><code class="hljs language-json">// ...\n<span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n  <span class="token string">"**/*.css"</span><span class="token punctuation">,</span>\n  <span class="token string">"**/*.scss"</span><span class="token punctuation">,</span>\n  <span class="token string">"./esnext/index.js"</span><span class="token punctuation">,</span>\n  <span class="token string">"./esnext/configure.js"</span>\n<span class="token punctuation">]</span><span class="token punctuation">,</span>\n// ...</code></pre>\n<p>对于代码 <code>import { Button } from "@shopify/polaris";</code> 它有以下的暗示：</p>\n<ul>\n<li>导入它：导入并包含该模块，分析评估它并继续进行依赖分析</li>\n<li>跳过它：不导入它，不分析评估它但会继续进行依赖分析</li>\n<li>排除它：不导入它，不评估且不做依赖分析</li>\n</ul>\n<p>以下是每个匹配到的资源的情况：</p>\n<ul>\n<li><code>index.js</code>: 没有直接的导出被使用，但被标记为有副作用 -> 导入它</li>\n<li><code>configure.js</code>: 没有导出被使用，但被标记为有副作用 -> 导入它</li>\n<li><code>types/index.js</code>: 没有导出被使用，没有被标记为有副作用 -> 排除它</li>\n<li><code>components/index.js</code>: 没有导出被使用，没有被标记为有副作用，但重新导出的导出内容被使用了 -> 跳过它</li>\n<li><code>components/Breadcrumbs.js</code>: 没有导出被使用，没有被标记为有副作用 -> 排除它。这也会排除所有如同 <code>components/Breadcrumbs.css</code> 的依赖，尽管它们都被标记为有副作用。</li>\n<li><code>components/Button.js</code>: 直接的导出被使用，没有被标记为有副作用 -> 导入它</li>\n<li><code>components/Button.css</code>: 没有导出被使用，但被标记为有副作用 -> 导入它</li>\n</ul>\n<p>在这种情况下，只有4个模块被导入到 bundle 中：</p>\n<ul>\n<li><code>index.js</code>: 基本为空的</li>\n<li><code>configure.js</code></li>\n<li><code>components/Button.js</code></li>\n<li><code>components/Button.css</code></li>\n</ul>\n<p>在这次的优化后，其它的优化项目都可以应用。例如：从 <code>Button.js</code> 导出 的<code>buttonFrom</code> 和 <code>buttonsFrom</code> 也没有被使用。<code>usedExports</code> 优化会捡起这些代码而且 terser 会能够从 bundle 中把这些语句摘除出来。</p>\n<p>模块合并也会应用。所以这4个模块，加上入口的模块（也可能有更多的依赖）会被合并。 <strong><code>index.js</code> 最终没有生成代码</strong>.</p>\n<h2 id="将函数调用标记为无副作用">将函数调用标记为无副作用<a href="#%E5%B0%86%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E6%A0%87%E8%AE%B0%E4%B8%BA%E6%97%A0%E5%89%AF%E4%BD%9C%E7%94%A8" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>是可以告诉 webpack 一个函数调用是无副作用的，只要通过 <code>/*#__PURE__*/</code> 注释。它可以被放到函数调用之前，用来标记它们是无副作用的(pure)。传到函数中的入参是无法被刚才的注释所标记，需要单独每一个标记才可以。如果一个没被使用的变量定义的初始值被认为是无副作用的（pure），它会被标记为死代码，不会被执行且会被压缩工具清除掉。这个行为被会开启当 <a href="/configuration/optimization/#optimizationinnergraph"><code>optimization.innerGraph</code></a> 被设置成 <code>true</code>。</p>\n<p><strong>file.js</strong></p>\n<pre><code class="hljs language-javascript"><span class="token comment">/*#__PURE__*/</span> <span class="token function">double</span><span class="token punctuation">(</span><span class="token number">55</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<h2 id="压缩输出结果">压缩输出结果<a href="#%E5%8E%8B%E7%BC%A9%E8%BE%93%E5%87%BA%E7%BB%93%E6%9E%9C" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>通过 <code>import</code> 和 <code>export</code>  语法，我们已经找出需要删除的“未引用代码(dead code)”，然而，不仅仅是要找出，还要在 bundle 中删除它们。为此，我们需要将 <code>mode</code> 配置选项设置为 <a href="/configuration/mode/#mode-production"><code>production</code></a>。</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-diff">const path = require(\'path\');\n\nmodule.exports = {\n  entry: \'./src/index.js\',\n  output: {\n    filename: \'bundle.js\',\n    path: path.resolve(__dirname, \'dist\'),\n  },\n<span class="token deleted">- mode: \'development\',</span>\n<span class="token deleted">- optimization: {</span>\n<span class="token deleted">-   usedExports: true,</span>\n<span class="token deleted">- }</span>\n<span class="token inserted">+ mode: \'production\',</span>\n};</code></pre>\n<blockquote class="tip">\n<p>注意，也可以在命令行接口中使用 <code>--optimize-minimize</code> 标记，来启用 <code>TerserPlugin</code>。</p>\n</blockquote>\n<p>准备就绪后，然后运行另一个命令 <code>npm run build</code>，看看输出结果有没有发生改变。</p>\n<p>你发现 <code>dist/bundle.js</code> 中的差异了吗？显然，现在整个 bundle 都已经被 minify(压缩) 和 mangle(混淆破坏)，但是如果仔细观察，则不会看到引入 <code>square</code> 函数，但能看到 <code>cube</code> 函数的混淆破坏版本（<code>function r(e){return e*e*e}n.a=r</code>）。现在，随着 minification(代码压缩) 和 tree shaking，我们的 bundle 减小几个字节！虽然，在这个特定示例中，可能看起来没有减少很多，但是，在有着复杂依赖树的大型应用程序上运行 tree shaking 时，会对 bundle 产生显著的体积优化。</p>\n<blockquote class="tip">\n<p>在使用 tree shaking 时必须有 <a href="/plugins/module-concatenation-plugin">ModuleConcatenationPlugin</a> 的支持，您可以通过设置配置项 <code>mode: "production"</code> 以启用它。如果您没有如此做，请记得手动引入 <a href="/plugins/module-concatenation-plugin">ModuleConcatenationPlugin</a>。</p>\n</blockquote>\n<h2 id="结论">结论<a href="#%E7%BB%93%E8%AE%BA" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>因此，我们学到为了利用 <em>tree shaking</em> 的优势， 你必须...</p>\n<ul>\n<li>使用 ES2015 模块语法（即 <code>import</code> 和 <code>export</code>）。</li>\n<li>确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细信息请参阅<a href="https://babeljs.io/docs/en/babel-preset-env#modules">文档</a>）。</li>\n<li>在项目的 <code>package.json</code> 文件中，添加 <code>"sideEffects"</code> 属性。</li>\n<li>使用 <code>mode</code> 为 <code>"production"</code> 的配置项以启用<a href="/concepts/mode/#usage">更多优化项</a>，包括压缩代码与 tree shaking。</li>\n</ul>\n<p>你可以将应用程序想象成一棵树。绿色表示实际用到的 source code(源码) 和 library(库)，是树上活的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。</p>\n<p>如果你对优化输出很感兴趣，请进入到下个指南，来了解 <a href="/guides/production">生产环境</a> 构建的详细细节。</p>\n'}}]);