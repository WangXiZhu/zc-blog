title: 'html5新标签data-*与template'
date: 2015-09-04 21:00:10
categories: blog
tags: [html5,template]
---

## 概述
首先这篇文章是由于看到 "script" 标签中引用了html内容，觉得甚是奇怪。在之前模模糊糊的印象中见过，但是但是也没有在意。不过今天在看微店[感觉又在打广告]的招聘网站的是否又看到了这个使用的方法，我觉得有必要学习一下。


####举个栗子

    <script type="text/template"  id="test">
		<div class="title register">
			<h1>姓名:</h1>
			<h2>年龄:</h2>
		</div>
	</script>

<!-- more -->

#### 使用方式
还是通过操作dom的形式来获取元素的内容
	
	var test = document.getElementById("test").innerHTML;
	document.write(test);

####分析
由于script中的html代码不能直接显示，所以它在页面中的作用就相当于是模板(template)，不过我觉得在script脚本中来做这件事显得有点越俎代庖。那么有没有其他的方式呢？答案是有的。在html5中就有template标签，而它的作用就是这里说的模板。

## tml5的template
template是属于web components里面的规范。作用是可以将不必立即渲染的元素，不必立即执行的脚本放入这里。

#### 举个栗子

	<script>
 	// 数据在这里是硬编码，但是也可以访问服务器获得数据
	    var data = [
		   { name: 'jack', age: 20, sex: 'Male'},
		   { name: 'rose', age: 19, sex: 'Female'},
		];
	</script>
    
	<table border="1">
		<thead>	 
            <tr>
		   		<th>姓名 <th>年龄 <th>性别
        </thead>
		<tbody>
	        <template id="row">
		   		<tr><td><td><td></tr>
		    </template>
        </tbody>
	</table>

	<script>
	    var template = document.querySelector('#row');
	    for (var i = 0; i < data.length; i += 1) {
    	   var person = data[i];
    	   var clone = template.content.cloneNode(true);
    	   var cells = clone.querySelectorAll('td');
    	   cells[0].textContent = person.name;
    	   cells[1].textContent = person.age;
    	   cells[2].textContent = person.sex;
    	   template.parentNode.appendChild(clone);
	    }
	</script>
		
这里就是通过template标签来实现刚刚script中的功能，结果可谓是<b>完美！</b>


### 扩展
以往可能我们也使用过其他的模板语言，如freemarker,或者就是我们常用的html文档。html文档中就可以通过include来引入其它的文件。而 template 同样也是可以的。

	<template id="ulList">
	  <li>
	    <strong><%=content%></strong>
	    <template>
	      <div>
	        <p><%=detail%></p>
	      </div>
	    </template>			
	  </li>
	</template>


### 注意点
	
	//通常获取内容方法
	var clone = document.getElementById("row").content；
	
	//实际上
	var clone = template.content.cloneNode(true);

如果我们直接将内容 appendChild 到 DOM 树中，documentFragment 内的内容就会被清空。因为 template 标签内容就是一个 documentFragment 的 shadowDOM，所以应该使用 cloneNode 或者 importNode 方法将内容复制到 DOM 中，这样才能保证这个 shadowDOM 内容不被清空。


## html5的data-*
在模板利用扩展之后，我又想起了之前看过的同样是html5标签的data-。

#### 作用
存储页面或应用程序的私有自定义数据。同时存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。

#### 格式

	属性名="属性值"  ==>  data-name="value"

#### 实例
	
	<span data-my-name="tony" data-age="20" id="info"></span>

	<h1 id="name"></h1>
	<h2 id="age"></h2>
	<script>
		var info = document.getElementById("info");
        document.getElementById("name").innerHTML = info.dataset.myName;
		document.getElementById("age").innerHTML = info.dataset.age;
	</script>

是不是显得非常地多余。但是我们可以定义多种数据，有的情况下需要，有时不需要，那么我们就可以通过script操作来实现。

#### data-*在script中如何使用
1.getAttribute与setAttribute存取dataset
	
	var name = document.getElementById("info").getAttribute("data-my-name");

2.通过Dataset
	
返回一个集合
	

	var dataset = document.getElementById("info").dataset;
	
某个具体数据

data-name 的data就可以直接省略，但是name的内容必须以驼峰式来进行命名。如data-git-hub就直接转为gitHub。

	var name = document.getElementById("info").dataset.myName;	

3.使用了jquery

jquery中获取该属性值可以通过 $.data() 的方式,以及 $.attr(),但是推荐 $.attr()的方式更加准确。

#### data-*浏览器支持情况

HTML5 Data属性的支持情况在IE上很糟糕。

[http://caniuse.com/#search=data-*](http://caniuse.com/#search=data-*)

* Internet Explorer: 11+
* Chrome: 8+
* Firefox: 6+
* Opera: 11.1+
* Safari: 6+
* Android Browser: 4+


学习网站：
http://www.w3.org/TR/html5/scripting-1.html#the-template-element