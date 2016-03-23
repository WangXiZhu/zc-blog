title: css-sprites
date: 2015-08-06 21:18:41
categories: blog    #文章文类
tags: [front-end,css] 
---
## css-sprites
最近在准备复习，在提高性能的谈到了css-sprites。自己找了一下资料，原来自己早就接触过，只是不知道还有个
“高大上”的学术名。我们使用的一些富文本编辑器中，可以看到有很多图标，而它们都是放在在一张图片上。

<!-- more -->
原来css-sprites的主要目的就是为了减少HTTP请求从来提高页面的性能

#### 例子

html代码

 	<!doctype html>
	<html>
	<head>
		<meta charset="utf-8" />
		<title>css sprite</title>
		<link rel="stylesheet" type="text/css" href="css/editor.css" />
	</head>
	<body>
		<img src="images/transparent.gif" class="editor bold" alt="bold Image" />
	    <img src="images/transparent.gif" class="editor italic" alt="italic Image" />
	    <img src="images/transparent.gif" class="editor underline" alt="underline Image" />
	   
	</body>
	</html>   


css代码

	
    .editor{
		background-image: url(../images/editor.png);
		width:16px;		/*背景图片的宽度  */
		height:16px;	/*背景图片的高度  */
	}

    .bold{
        background-position: 4px 1px;	/*背景图片的起始点*/
    }
    .italic{
        background-position: -27px 1px;
    }
    .underline{
        background-position: -28px 1px;
	}

#### 原理
*	通过定义一张图片的起始点，然后再定义它的宽度和高度来获取每张背景图片的范围。这样来实现了图片的分割。
*   利用CSS的“background-image”，“background-repeat”，“background-position”的组合进行背景定位

####适用范围
*	在一些比较规则的布局中，又包括了比较多的图片，这样我们就可以把他们通过ps拼为一张图片来提高我们的网站性能。比如在我们常访问的一些购物网站就充分留用了css sprite技术。

#### 优点与缺点
*  首先很明显提高我们的网站性能
*  增加的图片有可能比原来的小	
*  先定义好自己的图片，但是使用者需要指导具体每张图片的位置，如果修改内容比较繁琐。 

学习文章：http://www.qianduan.net/useful-to-create-a-simple-css-sprites/
