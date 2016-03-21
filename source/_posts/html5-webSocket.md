title: html5 webSocket
date: 2015-08-23 01:34:26
categories: blog    #文章文类
tags: [front-end,html5]
---
##WebSocket
####定义
websocket是从客户端使用简单的语法有效地推动消息到服务器，那么就必须有服务器监听。
同时WebSocket允许跨域通信，而XHR却受到域的限制。
####协议
属于自定义协议,ws(代替http://)或wss(代替https://)协议，可用于任意的客户端和服务器程序。
WebSocket协议基于TCP,进行双向通信的技术，PUSH技术类型.只需要一次握手。

####自定义协议
<b>优点</b>：client与server之间的发送数据少，适合移动应用
<b>缺点</b>：可能存在安全性

<!-- more -->


####WebSocket API 的用法

   
    var socket = new WebSocket('ws://localhost:8080');   // 创建一个Socket实例
    
    
    socket.onopen = function(event){                     // 打开Socket 
   
        socket.send('这是一条初始化消息');                  // 发送一个初始化消息
   
        socket.onmessage = function(event){              // 监听消息
            console.log('已接受一条消息',event);
        };
        
        
        socket.onclose = function(event){       // 监听Socket的关闭
            console.log('Client notified socket has closed',event);
        };
        
        //socket.close();           // 关闭Socket.... 
    };
    
####webSocket实例

<b>客户端</b>

[链接](http://wangxizhu.gitcafe.io/demo/websocket_fileupload/index.html)

<b>服务端</b>|java实现

[学习地址](http://my.oschina.net/u/590484/blog/74054)

####代码问题
sun.misc.base64encoder报错
[解决方法](http://blog.csdn.net/jbxiaozi/article/details/7351768)

####学习知识点
通过java的socket来实现服务端是挺容易，但这么文章很多数据处理上我是远远不及！如数据的位运算、掩码的处理。