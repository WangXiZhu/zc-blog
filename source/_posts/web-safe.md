title: 浏览器安全
date: 2015-08-10 09:51:39
categories: blog    #文章文类
tags: [front-end,浏览器安全]    #文章标签，多于一项时用这种格式
---
##浏览器安全
浏览器的安全是以“同源策略”为基础。
####同源策略

同源策略是指资源来自同一来源，他们相同的host(主机名)、protocal(协议)、port(端口号)，目的是阻止从一个源加载的文档或脚本获取或设置另一个源加载的文档的属性。
在我们提交一个一个请求时，内容中都包含了这几个信息。

<!-- more -->

####跨脚本攻击(XSS)
跨脚本攻击是Cross Site Script，是通过闭合标签的方式来实现XSS。根本还是通过“html注入”提交来 JavaScript 的内容文本在页面中执行或者绑定一些事件。
    	
      <input type="text" value=""/>
      //以下为在输入框中输入的内容
      "<script>alert(111)</script>

结果不出意料就是在我们请求时会弹出“111”窗口。

####跨站请求伪造(CSRF)
一般的是通过伪造信息来进行请求。

    <img src="http://www.baidu.com/manage/entry.do?m=delete&id=123456">
    
通过img标签来请求后台进行删除操作。

跨站请求伪造(Cross site request fork)是通过用户的身份信息来操作用户的一种方式。本质还是用户的参数被攻击者获取并使用。
#####cookie
如果在部分网站是通过判断cookie来判断用户，我们获取cookie
    
    document.cookie;    //获取cookie
    
在另外的浏览器中输入此cookie也可进行登录

#####get与post
CSRF无非是通过“src”属性来访问后台请求，在我们的常用的标签中如img、script、iframe都有此属性。都是写明我们的url和方法
得形式。我们称只为get方式。    
那post方式能否被利用来CSRF。答案是：可以的    
构造一个form标签，就是通过post方式来提交结果的。

#####如何防御
* 验证码
* token,在后头进行验证。注意保密性和随机性
* 判断http消息头是否在本地

####点击劫持
通过用户的点击事件来作用于攻击者的页面来获取数据或者破坏。通常的就是在网站的点击部分嵌入一个
<b>透明</b>的页面而欺骗用户，如“钓鱼网站”就是这样的做法。

#####防御点击劫持
* frame bustion(禁止使用frame)
* x-frame-options
    * deny【拒接加载frame页面】
    * sameorigin【frame页面的地址必须为同源域名下的页面】
    * allow-from origin【允许frame加载的页面地址】

学习资料：《白帽子讲安全》