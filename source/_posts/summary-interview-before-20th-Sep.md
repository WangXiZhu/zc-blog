title: 9月20日面试总结
tags: [interview,baidu,tengxun]
date: 2015-09-20 11:25:26
categories: blog
---

## 概述
虽然有机会参加百度和腾讯的面试，但是结果并不是很理想。目前已经双双败下阵来。如果说很难也谈不上，就是一些常见的基础问题。其中腾讯在技术上更侧重于深度，而且特别喜欢问计算机网络的知识。而百度就是原生的js操作问题多一点。不过每一个问题还是特别有意思。

## 问题
1.Cookie与sessionID是怎么传送
Cookie是服务器在本地机器上存的一段文本。
Cookie对应字段Cookie:客户端传送
Set-cookie：服务器向客户端设置cookie
cookie的使用：是由浏览器按照一定的原则在后台自动发送给服务器，如果没有规定过期时间，就是浏览器会话期。这种一般存在内存中，而不是写在硬盘上。如果设置了过期时间，就写在硬盘上。
<!-- more -->

Session是针对每个用户的，是保存在服务器上，用sessionID来区分是哪个用户变量。其中Session更加安全，因为它不会随意读取用户信息。
* Session机制
    Session以类似散列集方式（可能用散列集）存储。当要创建时，先检查，没有再创建，并返回给客户端保存。（sessionID既不能重复，也不能随意找到）

* Session的实现方式
	* 使用cookie来实现
	服务器给每个Session分配一个唯一的JSESSIONID，并通过Cookie发送给客户端。方式Set-cookie:JSESSIONID
	* 使用URL回显的方式
	服务器给浏览器的所有连接url中有JSESSIONID这个字段，在每次客户端点击连接都会传送该JSESSIONID,如果匹配不到就失败。（tomcat采取了这两种方式，其中<b>JSESSIONID只是tomcat对sessionid的称呼</b>）

2.CDN（content delivery network）如何放置？怎么获取的资源
* 技术原理
	负载均衡分布，网络传送上利用缓存技术，就近获取资源。减少网络中冗余数据的重复传输，使之最小化，将广域传输转为本地或就近访问。多台Cache加速服务器且分布在不同地域，需要通过有效地机制管理Cache网络，引导用户就近访问，全局负载均衡流量。复制到网络“边缘”，缩小“请求点”与“交互点”。

* 传送内容
	互联网上传递的内容，大部分为重复的Web/FTP数据。Cache服务器具有缓存，优化数据链路性能，大部分为网页对象：（web Page object,html 等页面文件，图片文件）

* 工作流程与原理
	
	![http://7xklhg.com1.z0.glb.clouddn.com/cdn_throry.png](http://7xklhg.com1.z0.glb.clouddn.com/cdn_throry.png)
	CDN中间添加了Cache层，然后通过接管DNS来引导数据获得源服务器的数据。
	
* 技术手段
	高速缓存、镜像服务器。适用于(静态和准动态数据同步)

	全局负载均衡DNS通过一组预先定义好的策略，将当时最接近用户的节点地址提供给用户，使用户能够得到快速的服务。

	负载均衡设备负责每个节点中各个Cache的负载均衡，保证节点的工作效率；同时，负载均衡设备还负责收集节点与周围环境的信息，保持与全局负载DNS的通信，实现整个系统的负载均衡。

　　高速缓存服务器（Cache）负责存储客户网站的大量信息，就像一个靠近用户的网站服务器一样响应本地用户的访问请求。

3.实现格雷码

1——[0，1]

2——[00,01,10,11]

3——[000,001,010,100,011,101,110,111]

之前觉得这道题不是很难，觉得就是通过把数字转换为2进制就结束了。但是忽略了一点就是。每行的数字个数相同，在3的时候，0的对应形式为‘000’，而不是‘0’。
	
	function getGreenCode(n){
		var len = Math.pow(2,n);
		var arr = [];
		var temp='';
		for(var j=0;j<n;j++){
			temp+=0;
		}
		for(var i=0;i<len;i++){
		//加“0”操作
			var str = temp+i.toString(2);
			arr.push(str.substr(str.length-n));
		}
		return arr;
	};

4.在浏览器加载url的过程
这道题也是常考的问题，没有绝对的答案。可以扩展的内容太多。恰巧这种题就非常考验我们的知识面，所以是一道可以提高我们分值的题目。


思路：结合计算机网络、操作系统、浏览器渲染原理来回答。

    1.浏览器分析链接指向页面的URL；
    
    2.浏览器向DNS(域名系统)请求解析页面所对应域名的IP地址；（浏览器缓存->系统缓存->路由器缓存）
    
    3.DNS(域名系统)解析出重庆理工大学的IP地址为“222.178.158.61”；
    
    三次握手（第三次目的：防止已失效的连接请求报文段突然又传到了B，因而产生错误）
    
    4.浏览器向服务器建立TCP连接(“IP”：222.178.158.61,“port”:80)；
    
    5.浏览器发出取命令步骤：GET/yxsz/yxsz.html；
    	
    6.服务器 www.cqut.edu.cn 给出相应,把文件/yxsz/yxsz.html发给浏览器；
    
    7.释放TCP连接。四次握手[客户端主动关闭，等待2MSL(maxinum segment lifetime),为了保证A发送的最后一个ACK报文段能够到达B;并防止“已失效的连接请求报文段”出现在连接中》）；
    
    8.浏览器显示“院系设置”的页面。（浏览器原理、DOM加载过程）


5.判断元素是否在区域内
一开始看到这个题非常懵，但是大致的思路就是通过原生的js来获取它的位置并比较。
	
	var a = document.getElementById("eq").offsetTop;
	if (a >= $(window).scrollTop() && a < ($(window).scrollTop()+$(window).height())) {
        alert("div在可视范围");
    }

6.元素js实现domready。   
面试前一天还看过jquery的$(document).ready(fn)与window.onload的区别，没想到后一天就遇到了。但当时并没有思考如果通过原生js来实现domReady。

	//简介版
	function ready(callback){
		if(document.addEventListener){			//标准浏览器
			document.addEventListener('DOMContentLoaded',function(){
				document.removeEventListener('DOMContentLoaded',arguments.callee,false);	//注销时间，避免反复触发
				callback();		//执行函数
			},false);
		}else if(document.attachEvent){			//IE浏览器
			document.attachEvent('onreadystatechange',function(){
				if(document.readyState=='complete'){
					document.detachEvent('onreadystatechange',arguments.callee);
					callback();		//函数执行
				}
			});
		}else if(document.lastChild == document.body){
			callback();
		}
	}

* $(document).ready(fn)与window.onload区别
	
$(document).ready(fn)是在dom文档树加载完之后执行一个函数；window.onload是在dom文档树加载完和所有文件加载完之后执行一个函数。

* DOMContentLoaded
DOMContentLoaded是html5中新加入的。就是为了是在domcontent加载完以及资源加载前的情况，就可以进行执行代码，减少延迟。


7.页面中上传文件，不跳转页面
	提交到插入式框架、弹出式窗口来掩盖这个现象。这里就直接在页面中写iframe来作为提交的目标。

	<form action="./xxx.jsp" enctype="multipart/form-data" method="POST" target="aa">
		<input type="file" name="myfile" />
		<input type="submit" />
	</form>

	<iframe name="aa" src="" style="display:none"></iframe>

## 补充知识

#### document.querySelectorAll()与document.querySelector()
    
DOM选择器，原生js操作元素获得元素，比jquery更加快。IE8也支持该方法，它接收的参数和 CSS 选择器完全一致。

document.querySelectorAll()：返回一个包含该元素的数组，没有就返回空数组；     
document.querySelector()：返回指定元素节点的子树中匹配selector的集合中的第一个，如果没有匹配，返回null。

    document.getElementById();
	//代替使用
	document.querySelector("#test");
	document.querySelectorAll("#test")[0];

例子：

document 中选取 class 为 test 的 div 的子元素 p 的第一个子元素。
	
	document.querySelector("div.test>p:first-child");
	document.querySelectorAll("div.test>p:first-child")[0];


## 后记
这并不是标准答案，只是我自己在学习的过程中记录的笔记。如若有错，请指正。