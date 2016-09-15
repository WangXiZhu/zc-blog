---
title: 获取数据方式
date: 2016-07-27 17:18:36
tags: [file-upload]
---

### header

  前后端数据交互的方式通常有。

  * xmlHttpRequest
  * formData
  * webSocket
  * promise
  * fetch

### slider

  如果框架中需要用原生javascript来写的话，会涉及到 xmlHttpRequest 这个对象。
通过这个对象我们能与后台进行交互，获取数据。


    ```javascript
    function ajax(options) {
  		options = options || {};
  		options.type = (options.type || "GET").toUpperCase();
  		options.dataType = options.dataType || "json";
  		let params = this.formatParams(options.data);
      let xhr;

  		if (window.XMLHttpRequest) {
  			xhr = new XMLHttpRequest();
  		} else { //IE6及其以下版本浏览器
  			xhr = new ActiveXObject('Microsoft.XMLHTTP');
  		}

  		xhr.withCredentials = true;
      	//接收 - 第三步
  		xhr.onreadystatechange = function () {
  			if (xhr.readyState == 4) {
  				let status = xhr.status;
  				if (status >= 200 && status < 300 || xhr.status == 304) {
  					options.success && options.success(xhr.responseText, xhr.responseXML);
  				} else {
  					options.fail && options.fail(status);
  				}
  			}
  		};
  		//连接 和 发送 - 第二步
  		if(options.type == "GET") {
  			xhr.open("GET", options.url + "?" + params, true);   
  			xhr.send(null);
  		}else if (("POST") == options.type ) {
  			xhr.open("POST", options.url, true);
  			xhr.setRequestHeader("Content-Type", options.contentType || "application/x-www-form-urlencoded");
  			if(options.header){
  				options.header.map(function(hd){
  					xhr.setRequestHeader(hd.title, hd.value);
  				});
  			}
  			xhr.send(params);
  		}
  	}

    function formatParams(data){
      var arr = [];
      for (var name in data) {
          //参数通过编码，来避免 GET 请求时发生错误
          arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
      }
      return arr.join("&");
    }

  以上代码，是我们熟悉的xmlHttpRequest封装的请求后台方法。包括了解析参数、新建连接、发送数据、接受部分数据、接受数据等步骤。

>  GET 方式发送数据
  xhr.open('GET', url , true) 如果没有用绝对路径，打开的方式是相对地址。所以如果配置的链接中没有包含 http 头可能会引起错误。

  其中 <i> xhr.withCredentials = true; </i>是为了发送认证数据，如 cookie 为了防止跨域时候请求失败。

  在发送数据 xhr.send()之前需要完成对 xhr 的一系列操作。

优点 ： 局部刷新,不影响用户的体验
缺点 ： 跨域问题，只能访问同域下的资源

#### formData

XHR2规范中的内容，最近做了个图片上传就用到 formData。

> 目的是用于表单数据序列化

![](http://7xklhg.com1.z0.glb.clouddn.com/formdata-api.png)

在 chrome的控制台下可以看到formData详细的 API，提供了新增、删除和遍历的方法。

当然在添加值之前需要初始化 formData.


    //我们可以直接通过构造方法添加 formData
    var data1 = new FormData(document.forms[0]);

    //方法二,通过 append 方法
    var data2 = new FormData();
    data2.append(key,value) 需要两个参数，键和值。

    //使用 FormData上传
    var xhr = new XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.send(data); //写入数据

* progress()
  通过该方法我们可以监听该上传数据的进程，可以通过返回的参数能用进度条更好地进行交互。

    xhr.progress = function(pe){
      if(pe.lengthComputable){

      }
    }

    当 我们通过头部信息 content-length 知道 后，lengthComputable会被
优点： 我们不需要去设置请求头部，XHR 对象能够识别数据类型是否是 formData 的实例。
缺点： 目前IE 浏览器需要 10+ 支持（真是坑）

### webSocket
在 web 端建立 socket来进行通信，刚开始学习java 时通过进行 client 和 server 类，通过 socket来进行通信。

* 使用入门

    var connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);
