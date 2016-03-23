title: Http学习
date: 2015-07-20 23:19:14   #发表日期，一般不改动
categories: blog    #文章文类
tags: [front-end,计算机网络]    #文章标签，多于一项时用这种格式
---

## Http学习
&emsp;&emsp;最近在准备前端的东西，突然觉得了解前端与后台交互的协议HTTP也是灰常重要滴！  
HTTP协议就是定义浏览器如何请求服务器，进行文件（文本、图像等）交换，其中服务端是有相应的进程
&emsp;&emsp;自监听浏览器是否发送请求。  
&emsp;&emsp;如果监听到连接建立，就建立TCP连接，接下里就是“三次握手"。

<!-- more -->

#### 计算机网络分析图

&emsp;&emsp;在具体学习前，我认为下面这张图片应该是重点，从它能够清楚的了解计算机网络的层级架构，以及具体的每个层级所连接的情况。
![](http://7xklhg.com1.z0.glb.clouddn.com/gitcafe_tcp.jpg)


#### TCP建立连接[三次握手]
*   浏览器发送请求，如浏览某个页面
*   服务端响应请求
*   建立连接

#### 工作图片

![](http://7xklhg.com1.z0.glb.clouddn.com/gitcafe_work-process.jpg)

由图片我们可以清楚知道请求的具体步骤
1.浏览器分析链接指向页面的URL；
2.浏览器向DNS(域名系统)<b>请求解析</b>页面所对应域名的IP地址；
3.DNS(域名系统)解析出重庆理工大学的IP地址为“222.178.158.61”；
4.浏览器向服务器建立TCP连接(“IP”：222.178.158.61,“port”:80)；
5.浏览器发出取命令步骤：GET/yxsz/yxsz.html；
6.服务器 [www.cqut.edu.cn](http://www.cqut.edu.cn/) 给出相应,把文件/yxsz/yxsz.html发给浏览器；
7.释放TCP连接；
8.浏览器显示“院系设置”的页面。


&emsp;&emsp;而在普通的浏览器请求前应该还有两步

*   浏览器要先分析页面的URL
*   浏览器请求DNS(域名系统)解析页面所对应域名的IP地址

#### 每次交互内容

  由ASCII码组成的请求和“类MIME-like”(通用的因特网邮件，自己百度哟)的响应组成
  
#### 特点
*  传输层采取TCP协议 【保证数据稳定传输】
*  无连接  【交互报文前不需要先连接】
*  无状态  【不能记住之前访问过同一个页面】



## HTTP请求方式

* get：请求读取由URL所标志的内容 
* post：给服务器添加信息在“报文”中。
* head：请求读取由URL所标志的内容的首部
* delete：通过http请求删除Request-URI所标识的资源

下面通过DELETE方式在jsp中通过tomcat来请求数据。

    
    function getXMLHTTPRequest(){
        if (XMLHttpRequest){
            return new XMLHttpRequest();
        }else{
            try{
                return new ActiveXObject('Msxml2.XMLHTTP');
            }catch(e){
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        }
    }
    var req = getXMLHTTPRequest();
    //index.jsp为测试页面
    req.open('DELETE','index.jsp',false);    //true和false是设定是否调用，如果用true则删除资源	
    req.send("test");
    document.write(req.responseText);


请求baidu.com


	req.open('DELETE','index.jsp',false);
	//改为
	req.open('DELETE','http://www.baidu.com',false);
	//返回状态码200，请求方法改为了OPTIONS
	//这应该是baidu自己设定的吧！


## 代理服务器

&emsp;&emsp;就是一个缓存，可以暂存一些请求和响应。如果在缓存上有相同的请求就不用在去浏览器上请求资源了。
如果没有的话，再进行请求而请求后，会把返回的对象存在本地存储器，下次请求时可以直接使用。
所以它是服务端和客户端的合体。
好处就是会减少时延。


## 域名系统DNS

&emsp;&emsp;作用就是用来把我们使用的域名转为IP地址，如 "www.cqut.edu.cn" 的IP地址
是"222.178.158.61"，其间在专设的节点上有专用的域名服务器。当某应用进程需要解析域名时，就通过DNS请求报文，以UDP的数据报形式发送给本地域名服务器。

下面是详细步骤：
> 1.操作系统会先检查自己本地的hosts文件是否有这个网址映射关系，如果有，就先调用这个IP地址映射，完成域名解析
> 2、如果hosts里没有这个域名的映射，则查找本地DNS解析器缓存，是否有这个网址映射关系，如果有，直接返回，完成域名解析。 
> 3、如果hosts与本地DNS解析器缓存都没有相应的网址映射关系，首先会找TCP/ip参数中设置的首选DNS服务器，在此我们叫它本地DNS服务器，此服务器收到查询时，如果要查询的域名，包含在本地配置区域资源中，则返回解析结果给客户机，完成域名解析，此解析具有权威性。 
> 4、如果要查询的域名，不由本地DNS服务器区域解析，但该服务器已缓存了此网址映射关系，则调用这个IP地址映射，完成域名解析，此解析不具有权威性。 
> 5、如果本地DNS服务器本地区域文件与缓存解析都失效，则根据本地DNS服务器的设置（是否设置转发器）进行查询，如果未用转发模式，本地DNS就把请求发至13组根DNS，根DNS服务器收到请求后会判断这个域名(.com)是谁来授权管理，并会返回一个负责该顶级域名服务器的一个IP。本地DNS服务器收到IP信息后，将会联系负责.com域的这台服务器。这台负责.com域的服务器收到请求后，如果自己无法解析，它就会找一个管理.com域的下一级DNS服务器地址(example.com)给本地DNS服务器。当本地DNS服务器收到这个地址后，就会找example.com域服务器，重复上面的动作，进行查询，直至找到www.example.com主机。 
> 6、如果用的是转发模式，此DNS服务器就会把请求转发至上一级DNS服务器，由上一级服务器进行解析，上一级服务器如果不能解析，或找根DNS或把转请求转至上上级，以此循环。不管是本地DNS服务器用是是转发，还是根提示，最后都是把结果返回给本地DNS服务器，由此DNS服务器再返回给客户机。


#### 域名结构及划分

&emsp;&emsp;层次树状结构，如 cqut(三级域名).edu(二级域名).cn(顶级域名)。而且每次查找都是从顶级域名开始。   
&emsp;&emsp;如图所示

![](http://7xklhg.com1.z0.glb.clouddn.com/gitcafe_dsn_space.png)

&emsp;&emsp;  正因为有此结构，系统才能更快解析出我们的IP地址   

