title: input表单类型
date: 2015-11-05 10:26:15
categories: blog
tags: [ input, type]
---
## 问题概述
今天在写页面的时候发现
	
	<form action="test.html">
		<input type="image"/>
	</form>

在页面上显示的有个“提交”，但是我并没有写什么内容，有点郁闷。为什么呢？难道它和“type=submit”的效果相同？经验证发现是这样的。点击它会跳转页面


## 问题发散
使用“type=image”实质创建了一个图片控件，在点击的过程中我发现它会记录鼠标点击图片的位置，即像素点相对图片的位置。

	file:///C:/Users/Administor/Desktop/c.html?x=94&y=66

## 问题实质

由于有与“submit”类似的“提交”功能，所以我们应避免使用。这样的会造成页面的二次提交。
    
## 解决办法

1.不使用该标签,使用image标签代替

2.阻止事件的默认行为

	<input type="image" src="../img/demo.jpg" onclick="operate();return false;">


--- 	

===============update by 16/03/23===============

### input标签学习

input作为表单元素之一，应该是与用户最为接近的标签了！


#### 类型type
虽然h5落地很久了，但是在开发中用的次数不是很多。而且有的时候基本是使用常见的几个，但是在h5中新增的几个类型功能却很强大。type中的shadow dom中添加了很多自己的样式以及功能。

* color	拾色器
* date 控制输入日期（年，月，日）
* datetime （废弃）
* datetime-local （没有时区）
* month 输入年，月，没有时区
* time 输入时间 ，没有时区（zone）
* week 包含年-周的数字
* email（验证输入值在提交前为空或者是有效的邮件）
* number 输入浮点数,不能输入其他字符
* range  输入一个随机数
* search	搜索框，同时带有删除输入值的效果
* tel	输入电话号码,这需要自己限制输入的规则和最大长度来限制输入信息
* url	输入值包含url
