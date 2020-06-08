(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{397:function(n,s,t){"use strict";t.r(s),s.default='<p>Instrument JS files with <a href="https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-lib-instrument">istanbul-lib-instrument</a> for subsequent code coverage reporting</p>\n<h2 id="install">Install<a href="#install" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> i -D istanbul-instrumenter-loader</code></pre>\n<h2 id="a-hrefhttpswebpackjsorgconceptsloadersusagea"><a href="https://webpack.js.org/concepts/loaders">Usage</a><a href="#a-hrefhttpswebpackjsorgconceptsloadersusagea" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<h3 id="references"><code>References</code><a href="#references" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<ul>\n<li><a href="https://github.com/webpack/karma-webpack">karma-webpack</a></li>\n<li><a href="https://github.com/mattlewis92/karma-coverage-istanbul-reporter">karma-coverage-istanbul-reporter</a></li>\n</ul>\n<h3 id="structure"><code>Structure</code><a href="#structure" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<pre><code>├─ src\n│ |– components\n│ | |– bar\n│ | │ |─ index.js\n│ | |– foo/\n│     |– index.js\n|– test\n| |– src\n| | |– components\n| | | |– foo\n| | | | |– index.js\n</code></pre>\n<p>To create a code coverage report for all components (even for those for which you have no tests yet) you have to require all the 1) sources and 2) tests. Something like it\'s described in <a href="https://github.com/webpack/karma-webpack#alternative-usage">"alternative usage" of karma-webpack</a></p>\n<p><strong>test/index.js</strong></p>\n<pre><code class="hljs language-js"><span class="token comment">// requires all tests in `project/test/src/components/**/index.js`</span>\n<span class="token keyword">const</span> tests <span class="token operator">=</span> require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span><span class="token string">\'./src/components/\'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token regex">/index\\.js$/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ntests<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tests<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// requires all components in `project/src/components/**/index.js`</span>\n<span class="token keyword">const</span> components <span class="token operator">=</span> require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span><span class="token string">\'../src/components/\'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token regex">/index\\.js$/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\ncomponents<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>components<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<blockquote>\n<p>ℹ️  This file will be the only <code>entry</code> point for <code>karma</code></p>\n</blockquote>\n<p><strong>karma.conf.js</strong></p>\n<pre><code class="hljs language-js">config<span class="token punctuation">.</span><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token operator">...</span>\n  files<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token string">\'test/index.js\'</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  preprocessors<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">\'test/index.js\'</span><span class="token punctuation">:</span> <span class="token string">\'webpack\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  webpack<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span>\n    module<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      rules<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token comment">// instrument only testing sources with Istanbul</span>\n        <span class="token punctuation">{</span>\n          test<span class="token punctuation">:</span> <span class="token regex">/\\.js$/</span><span class="token punctuation">,</span>\n          use<span class="token punctuation">:</span> <span class="token punctuation">{</span> loader<span class="token punctuation">:</span> <span class="token string">\'istanbul-instrumenter-loader\'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>\n          include<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'src/components/\'</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n    <span class="token operator">...</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  reporters<span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">\'progress\'</span><span class="token punctuation">,</span> <span class="token string">\'coverage-istanbul\'</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  coverageIstanbulReporter<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    reports<span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">\'text-summary\'</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    fixWebpackSourcePaths<span class="token punctuation">:</span> <span class="token boolean">true</span>\n  <span class="token punctuation">}</span>\n  <span class="token operator">...</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<h3 id="with-babel">with <code>Babel</code><a href="#with-babel" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<p>You must run the instrumentation as a post step</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token punctuation">{</span>\n  test<span class="token punctuation">:</span> <span class="token regex">/\\.js$|\\.jsx$/</span><span class="token punctuation">,</span>\n  use<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    loader<span class="token punctuation">:</span> <span class="token string">\'istanbul-instrumenter-loader\'</span><span class="token punctuation">,</span>\n    options<span class="token punctuation">:</span> <span class="token punctuation">{</span> esModules<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  enforce<span class="token punctuation">:</span> <span class="token string">\'post\'</span><span class="token punctuation">,</span>\n  exclude<span class="token punctuation">:</span> <span class="token regex">/node_modules|\\.spec\\.js$/</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span></code></pre>\n<h2 id="a-hrefhttpsgithubcomistanbuljsistanbuljsblobmasterpackagesistanbul-lib-instrumentapimdinstrumenteroptionsa"><a href="https://github.com/istanbuljs/istanbuljs/blob/master/packages/istanbul-lib-instrument/api.md#instrumenter">Options</a><a href="#a-hrefhttpsgithubcomistanbuljsistanbuljsblobmasterpackagesistanbul-lib-instrumentapimdinstrumenteroptionsa" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The loader supports all options supported by <code>istanbul-lib-instrument</code></p>\n<table>\n<thead>\n<tr>\n<th align="center">Name</th>\n<th align="center">Type</th>\n<th align="center">Default</th>\n<th align="left">Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><code>debug</code></strong><p class="description mobile"><code>{Boolean}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{Boolean}</code></td>\n<td align="center"><code>false</code></td>\n<td align="left">Turn on debugging mode</td>\n</tr>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><code>compact</code></strong><p class="description mobile"><code>{Boolean}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{Boolean}</code></td>\n<td align="center"><code>true</code></td>\n<td align="left">Generate compact code</td>\n</tr>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><code>autoWrap</code></strong><p class="description mobile"><code>{Boolean}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{Boolean}</code></td>\n<td align="center"><code>false</code></td>\n<td align="left">Set to \n<code>true</code>\n to allow return statements outside of functions</td>\n</tr>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><code>esModules</code></strong><p class="description mobile"><code>{Boolean}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{Boolean}</code></td>\n<td align="center"><code>false</code></td>\n<td align="left">Set to \n<code>true</code>\n to instrument ES2015 Modules</td>\n</tr>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><code>coverageVariable</code></strong><p class="description mobile"><code>{String}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{String}</code></td>\n<td align="center"><code>__coverage__</code></td>\n<td align="left">Name of global coverage variable</td>\n</tr>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><code>preserveComments</code></strong><p class="description mobile"><code>{Boolean}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{Boolean}</code></td>\n<td align="center"><code>false</code></td>\n<td align="left">Preserve comments in \n<code>output</code></td>\n</tr>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><code>produceSourceMap</code></strong><p class="description mobile"><code>{Boolean}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{Boolean}</code></td>\n<td align="center"><code>false</code></td>\n<td align="left">Set to \n<code>true</code>\n to produce a source map for the instrumented code</td>\n</tr>\n<tr>\n<td align="center"><div class="title"><p>Name</p><p>Type</p><p>Default</p><p>Description</p></div>\n<div class="content"><p><strong><code>sourceMapUrlCallback</code></strong><p class="description mobile"><code>{Function}</code></p></p></div></td>\n<td align="center" class="description desktop"><code>{Function}</code></td>\n<td align="center"><code>null</code></td>\n<td align="left">A callback function that is called when a source map URL is found in the original code. This function is called with the source filename and the source map URL</td>\n</tr>\n</tbody>\n</table>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token punctuation">{</span>\n  test<span class="token punctuation">:</span> <span class="token regex">/\\.js$/</span><span class="token punctuation">,</span>\n  use<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    loader<span class="token punctuation">:</span> <span class="token string">\'istanbul-instrumenter-loader\'</span><span class="token punctuation">,</span>\n    options<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token operator">...</span>options<span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n<h2 id="maintainers">Maintainers<a href="#maintainers" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<table>\n  <tbody>\n    <tr>\n      <td align="center">\n        <img width="150" height="150"\n        src="https://avatars.githubusercontent.com/u/266822?v=3&s=150">\n        </br>\n        <a href="https://github.com/deepsweet">Kir Belevich</a>\n      </td>\n      <td align="center">\n        <a href="https://github.com/bebraw">\n          <img width="150" height="150" src="https://github.com/bebraw.png?v=3&s=150">\n          </br>\n          Juho Vepsäläinen\n        </a>\n      </td>\n      <td align="center">\n        <a href="https://github.com/d3viant0ne">\n          <img width="150" height="150" src="https://github.com/d3viant0ne.png?v=3&s=150">\n          </br>\n          Joshua Wiens\n        </a>\n      </td>\n      <td align="center">\n        <a href="https://github.com/michael-ciniawsky">\n          <img width="150" height="150" src="https://github.com/michael-ciniawsky.png?v=3&s=150">\n          </br>\n          Michael Ciniawsky\n        </a>\n      </td>\n      <td align="center">\n        <a href="https://github.com/mattlewis92">\n          <img width="150" height="150" src="https://github.com/mattlewis92.png?v=3&s=150">\n          </br>\n          Matt Lewis\n        </a>\n      </td>\n    </tr>\n  <tbody>\n</table>\n'}}]);