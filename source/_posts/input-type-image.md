title: 表单类型image
date: 2015-11-05 10:26:15
categories: blog
tags: [input,type,image]
---
##问题概述
今天在写页面的时候发现
	
	<form action="test.html">
		<input type="image"/>
	</form>

在页面上显示的有个“提交”，但是我并没有写什么内容，有点郁闷。为什么呢？难道它和“type=submit”的效果相同？经验证发现是这样的。点击它会跳转页面


##问题发散
使用“type=image”实质创建了一个图片控件，在点击的过程中我发现它会记录鼠标点击图片的位置，即像素点相对图片的位置。

	file:///C:/Users/Administor/Desktop/c.html?x=94&y=66

##问题实质

由于有与“submit”类似的“提交”功能，所以我们应避免使用。这样的会造成页面的二次提交。
    
##解决办法

1.不使用该标签,使用image标签代替

2.阻止事件的默认行为

	<input type="image" src="../img/demo.jpg" onclick="operate();return false;">
