title: 第二章－选择器
date: 2016-01-6 20:17:42
categories: blog
tags: [front-end,css]
---



我认为css的选择器目的就是我们提供了一个快捷的方式，而我们常用的无非就是元素、类、ID等几种选择器，而其他的几种使用的真的是不多。但是在有的情况下使用这些选择器，你会发现效率大大提高。

(PS: 尼玛，才发现之前写过总结过一次)
#### 选择器种类
* 元素选择器
	

		#css代码
		div{background:#ccc;}
		zc{background:#ccc;}

		#html代码
		<div>
			<span>这是一段文字</span>
		</div>
		<zc>这是自定义标签</zc>
<b>展示如下</b>

<zc style="background:#ccc;display:border;">这是自定义标签</zc>

<div style="background:#ccc"><span>这是一段文字</span></div>

<!-- more -->
通常这么使用的话，<span style="color:red">整个页面的div</span>元素都会有1个灰色的背景。     
这里，我貌似重新定义了一个标签 <b>zc</b>,并且还对它设置了样式，但是在查看源码时可以看到是把它放到p标签中，浏览器是把它当作了两个标签解析。

那如何来定义呢？

		
		<html xmlns:zc>
			<head>
				<style>
					zc{background:#ccc;}
				</style>
			</head>
			<body>
				<zc>自定义标签</zc>	
				<zc>自定义标签</zc>	
			</body>
		</html>

通过这种方式，浏览器就会解析标签，并解析为行内元素。

* 类选择器

	
		#css样式
		div.zc{
			border:1px solid #ccc;
		}

		#html代码
		<div class="zc">类选择器</div>

这样则可以定义所有class为zc的div元素了！通常我们定义同种样式的时候使用得较多，如商品详情页中的每个商品。


* ID选择器
		
		#css样式
		div.zc{
			border:1px solid #ccc;
		}

		#html代码
		<div id="zc">id选择器1</div>	
		<div id="zc">id选择器2</div>	

开始以为浏览器只会渲染第一个，但是通过实验。发现以上两个都被渲染。看来浏览器在解析的时候直接通过<b>zc</b>来查找，但是通过HTML DOM就只会返回第一个 id='zc'的DOM元素.

* 属性选择器
属性选择器是对指定的属性来进行设置，如果html元素中有改元素，则work


	
		#style
		[demo]}{
			color: #E9967A;
			font-size: 14px;
			font-family: serif;
		}
		
		.zc{
			border: 1px solid #00008B;
		}

		#html
		<div class="zc" demo='class'></div>
		<div id="zc" demo='id'></div>


<style>
	.zc-attr [demo]{
		color: #E9967A;
		font-size: 14px;
		font-family: serif;
	}
	.zc-attr .zc{
		border: 1px solid #00008B;
	}

	.zc-attr span{
		color: blue;
	}
</style>
<div class="zc-attr">
	<span id='zc' demo='id'>这是id为zc的元素</span><br>
	<span class="zc" demo='class'>这是class为zc的元素 &nbsp;&nbsp;&nbsp;<span >这是在class内部，没有demo属性的元素</span></span>
</div>

可见属性选择器只关心html元素中是否包含该属性。当然每个选择器都可以与其他选择器一起使用，达到更好的筛选效果。

其中，比较高级的就是结合正则表达式来选择元素，设置样式。

*

html其中比较有意思的地方就是层次结构，类比“树”!

![http://7xklhg.com1.z0.glb.clouddn.com/html-tree.png](http://7xklhg.com1.z0.glb.clouddn.com/html-tree.png)

结构是以html作为根节点，以后每个元素有可能是另一个元素的子元素或者父元素。而且这张图对我理解后面的几种选择器也是大有帮组。


* 后代选择器

<del>顾名思义，就是获得了一个元素所有的后代的权限可以来设置样式。</del>

错了，其实是浏览器从左到右来筛选元素。


		=====style=======
		div #zc{
			color: #6495ED;
		}
		p #zc{
			color: #00FFFF;
		}

		=====html========
		<div>
			<span id="zc">demo-div</span>
		</div>
		<p>
			<span id="zc">demo-p</span>
		</p>


<style>
		div.demo #zc{
			color: #6495ED;
		}
		p.demo #zc{
			color: #00FFFF;
		}
		
</style>

<div class='demo'>
	<span id="zc">demo-div</span>
</div>
<p class='demo'>
	<span id="zc">demo-p</span>
</p>



其中后代选择器作用是通过空格的形式来筛选元素。否则变为了设置改id(class)的元素了。

* 子元素选择器

子元素选择器和后台选择器从语义上来区分我还是真的有点模糊。从范围来看应该是后代选择器>子代选择器。子代选择器就是亲儿子嘛！

<b>语法</b>
	使用子结合符（>）


		=====style=====
		h3 > span{
			color:red;
		}
		=====html======
		<h3>
			<span>大儿子</span>
			<span>二儿子</span>
		</h3>
		<h3>
			<em>
				<span>大孙子</span>
			</em>
			<span>二儿子</span>
		</h3>

<style>
	h3.demo > span{
			color:red;
	}
</style>
<h3 class="demo"><span>大儿子</span>&nbsp;&nbsp;<span>二儿子</span></h3>
<h3 class="demo"><em><span>大孙子</span></em>&nbsp;&nbsp;<span>二儿子</span></h3>


* 相邻兄弟选择器

相邻兄弟嘛，就必须<em>同一个父母</em>，并且只能选择紧邻的一个。

<b>语法</b>
	相邻兄弟结合符，通过（＋）来表示
我觉得通过list来解释还比较清晰。

		
		=======style=====
		li + li{
			color: #6495ED;
		}
		=======html======
		<ol>
			<li>list1</li>
			<li>list2</li>
			<li>list3</li>
		</ol>

		//其中list1不能被选择，而list2是list1的兄弟，同时list3也是list1的兄弟。所以，表现如下！

<style>
	.demo li + li{
			color:#6495ED;
		}	
</style>

<ol class="demo">
	<li>list1</li>
	<li>list2</li>
	<li>list3</li>
</ol>



* 伪类

最常用的就是a标签的几个了。:link, :visited, :hover, :active(love-hate)

* 伪元素

其中在编辑页面是可能回经常用到 :first-line[第一行], :first-letter[第一个字母], ::selection[选取内容] ， not(p)［非p的内容］ 

其中伪元素还有限定的属性



| first_letter |    first_line | 
| :-------- | --------:| 
| 所有font属性 | 所有font属性 |
| color | color | 
| 所有background属性 | 所有background属性 | 
| 所有margin熟悉 | word-spacing | 
| 所有padding | letter-spacing | 
| 所有border | text-decoration | 
| text-decoration | vertical-align | 
| vertical-align | text-transform | 
| text-transform | line-height | 
| line-height | clear | 
| float | text-shadow | 
| letter-spacing |  | 
| word-spacing |  |
| clean |  |
| text-shadow |  | 


#### 参考资料
[http://www.w3school.com.cn/css/index.asp](http://www.w3school.com.cn/css/index.asp)