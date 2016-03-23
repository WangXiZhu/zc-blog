title: Web应用编程者在发布站点应该注意的细节
date: 2015-08-27 22:23:00
categories: blog    #文章文类
tags: [front-end,article_tanslate]


---
## 概述


翻译原文地址：[戳这里](http://programmers.stackexchange.com/questions/46716/what-technical-details-should-a-programmer-of-a-web-application-consider-before)


## 译
这里可能大多数在列表中你已经知道，但是可能有一两条你原来没有见过。不要完全理解，否则可能从来没有听说过。
#### 接口和用户体验
* 保证你的站点兼容主流浏览器. 如Gecko engine (Firefox), a WebKit engine (Safari和手机浏览器),Chrome, 你支持IE浏览器(最好兼容性VPC图像),和Opera. 在不同操作系统上浏览器如何渲染你的站点
* 考虑用户可能不使用主流浏览器：如cell phones, screen readers and search engines和其他一些信息工具WAIandSection508, Mobile development:MobiForge
* 阶段：怎样发布更新而不影响你的用户。有一个或多个测试或分段环境，可实现对体系结构、代码或扫描内容的更改，并确保它们可以被部署在一个没有破坏任何东西的控制方式中。有一个自动化的方式，然后部署到现场的现场现场。而最有效实现这些东西是使用控制版本系统（CVS、Subversion等）和自动构建工具(Ant, NAnt等).
* 不要直接给用户展示不友好的错误
* 不要在页面中展示用户的邮件地址不然他们会收到太多的垃圾邮件
* 添加rel="nofollow"属性让用户的链接避免垃圾留言
* 在你的站点中建立精细的限制（同属于安全问题）
* 学习怎么样渐进增强
* 重定向一个post请求如果这个post请求成功来防止刷新再一次提交
* 不要忘记可访问这个用户。在法律上这是必要的。WAI-ARIA和WCAG 2是这方面的好的资源
* Don't make me think

<!-- more -->

#### 安全性
* 这里有太多内容，但是OWASP发展指导从上到下包含了web站点的安全
* 了解注入特别是sql注入，以及怎样防御它
* 不要相信用户的输入信息和请求中的信息（包含cookie和字段中隐藏值）
* 先撒“佐料”（加密），然后再散列密码。并采用不同的加密方式来避免rainbow攻击。使用一个慢散列算法，如bcrypt（时间测试）或scrypt（更安全，但是更新）来保存密码。（怎么安全保存A密码）。NIST提出了PBKDF2来散列密码，避免直接使用MD5或SHA。、
* 尽量不要提出你自己的花哨的认证系统。它更容易变得微妙并不可测试，甚至你被黑了你也不知道。
* 了解信用卡的规则
* 使用SSL/HTTPS来进行登录和其他需要敏感数据的页面。
* 防止session攻击
* 避免跨脚本攻击cross site scripting(XSS).
* 避免跨站点请求cross site request forgeries(CSRF).
* 避免点击劫持Clickjacking.
* 让你的系统保存更新到你最近一次修改
* 保证你的数据库连接信息安全
* 了解最新的攻击技术和漏洞来完善你的平台
* 阅读google浏览器安全手册
* 阅读web应用黑客手册
* 了解最小特权原则，尝试去允许你的app服务器在没有权限的情况下

#### 优化
* 如果必要实现缓存，熟悉并使用HTTP缓存和HTML5 Manifest.
* 优化图片。不要使用一张20kb的图片当背景
* 学习怎么样压缩内容
* 合并多个css文件（stylesheets）和脚本文件（script）来减少浏览器连接的数量并提高压缩的能力来压缩重复的文件
* 看哈雅虎优化站点，大量的指导。包含了提高前端的表现性能和他们的YSlow工具（包含了firefox,safari,chrome和opera）,同时google页面测试来进行性能分析同时他也会优化你的图片。
* 使用css精灵（css sprites）对于小的关联的图片如导航栏（最小化http请求）
* 针对访问量大的网站应该分域部署部件
* 静态内容 (i.e. images, CSS, JavaScript, 和不需要通过cookie访问的内容) 应该在一个分开的域并不使用cookie，因为一个域的所有cookie和它的子域会在包含每个请求中来访问这个域。一个好的方法是使用CDN（content delivery network）.但是考虑到CDN方式有可能失效在可选择域中，所以可以用本地拷贝来代替
* 最小化http请求数量让浏览器来渲染页面
* 在JavaScript中利用google 闭包编译器和其他最小化的工具
* 保证站点的根目录下有favicon.ico文件。浏览器会自动请求这个文件。即使这个图标没有在html出现。如果你没有favicon.ico将会导致大量的404错误，耗费你服务器的带宽。

#### SEO (优化搜索引擎)
* 使用对搜索引擎友好的url.。如使用example.com/pages/45-article-title代替example.com/index.php?page=45
* 当使用“#”来代替动态内容的时候使用‘！#’代替‘#’，在服务器端googlebot(google页面机器人)使用$_REQUEST["_escaped_fragment_"]代替“！#”，其他的如./#!page=1 变为了./?_escaped_fragments_=page=1。用户可能使用FF4或者Chromium；ls一个是好的命令。所以即使这个页面地址栏已经改变页面也没有重载。你可以使用？代替！#来保存动态的内容同时告诉服务器当你发邮件是这个链接是在页面的最后，AJAX 不需要其他的请求。
* 不要使用链接如“click here”.你失去了一个SEO的机会，对于屏幕阅读者来说更难。
* 拥有XML 站点图,最好默认路径为/sitemap.xml.
* 使用<link rel="canonical" ... />当你有很多链接指向同一内容时，这个问题能够在Google Webmaster Tools上得到解决
* 使用Google Webmaster 和Bing Webmaster .
* 在开始安装Google Analytics（或者开源工具Piwik）
* 了解robot.text以及搜索引擎蜘蛛如何工作的
* 重定向请求（使用301永久移除）从www.example.com到example.com来防止在所有站点中降低排名
* 了解会有表现怪异的引擎蜘蛛
* 如果你又非分本内容在谷歌的地图扩展视频等，这有一些比较好的消息在Tim Farley's answer中。




#### 技术

* 了解http和诸如GET, POST, sessions, cookies等，并了解“无状态”的意义
* 根据w3c规则书写自己的XHTML/HTML和CSS并保证他们有效。目的是为了避免浏览器的怪异模式。这样他们就能在非传统的浏览器上运行，如屏幕阅读器和手机设备。
* 了解JavaScript在浏览器中的运行过程
* 了解在你页面中的JavaScript和层叠样式以及其他资源如何加载并思考如何提高性能。将script脚本放置在页面的底部已被广泛认同如解析apps or HTML5 shims.
* 了解JavaScript的沙箱（sandbox）,特别是你要使用iframe
* 意识到JavaScript可能现在能运行但将来可能会失效，所以Ajax就被扩展了，而不是一个基础。甚至大多数用户都远离它了，记住noscript(无脚本，静态页面【我的理解】)越来越流行，手机设备可能不会按照期望运行，而且google访问你的站点时将不会运行你的大多数JavaScript文件
* 学习301与302重定向的区别（SEO问题）
* 尽量多地学习部署平台
* 考虑使用重叠样式表和普通css
* 学习javascript框架（如jQuery,MooTools,Prototype,Dojo或者YUI 3），将会隐藏多数浏览器差别当操作DOM时
* 优化和js框架一起运用，考虑使用服务如google library API来加载框架。所以浏览器能够使用框架的备份已经在浏览器中缓存而不是从你的站点下载一个重复的文件
* 不要重复造轮子。在做任何事前搜索一个组件或者例子了解怎么完成它，有９９％的可能有人已经做过并发布了开源代码
* 另一方面，你决定你需要什么之前不需要太多东西。特别是在客户端网络，它几乎总是更重要的是要保持东西轻，快速，灵活。

#### Bug修复
* 明白你将使用２０％的时间来编码。８０％的时间来完善它，所以有针对性
* 建立一个好的错误报告方式。
* 为人们新建一个系统来提出建议和意见
* 经常备份(确保这些备份都是功能性的)，要有恢复策略不止是备份策略
* 使用版本控制系统来保存你的文件，如git、subversion、Mercurial等
* 不要忘记验收测试，如Selenium框架。除非你完全自动化测试，可能使用一个连续整合的工具，如Jenkins.
* 确保你的系统使用了日志框架，如log4j,log4net或者log4r。如果你的站点出了什么问题，你可以及时查看
* 记录日志的时候捕捉你处理过的异常和没有处理的异常。总结/分析    输出日志。它将展示出你的站点的关键问题。

#### 其他的
* 实现服务器端和客户端的监控和分析（应该主动而不是被动）
* 使用诸如userservice和Intercom 等服务来与你的用户联系
* 采用Vincent Driessen's Git branching model

大多数遗漏的东西并不是很有效，也有可能他们太详细，不在范围之内，或者与其他人了解的差不多。请随时补充，可能我也有遗留的地方或者有些错误。