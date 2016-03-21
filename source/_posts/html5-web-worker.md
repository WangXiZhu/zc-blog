title: html web worker
date: 2015-08-07 16:45:13
categories: blog    #文章文类
tags: [front-end,html]
---

##html5的web worker

<b>异步执行代码，而不阻塞代码。来解决script的阻塞问题</b>

<!-- more -->

####交互方式：

主线程和新线程：Postmessage （提交消息） , onmessage （接受消息）

有点类似于 socket编程 ，构建服务端与客户端

    //worker.js(服务端)
    
    onmessage =function (evt){
    	var d = evt.data;//通过evt.data获得发送来的数据
     	postMessage( "访问了worker.js :" + d );//将获取到的数据发送会主线程
    }


    //WEB页面主线程(客户端)
    
    var worker =new Worker("worker.js"); //创建一个Worker对象并向它传递将在新线程中执行的脚本的URL
    	worker.postMessage("hello world");     //向worker发送数据
    	worker.onmessage =function(evt){     //接收worker传过来的数据函数
        console.log("获取数据 ：" + evt.data);              //输出worker发送来的数据
    }


####弊端：
* Firefox支持，而chrome不支持。  
* 不能跨域加载js