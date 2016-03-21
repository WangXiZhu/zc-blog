title: css3标签
date: 2015-08-12 23:18:59
categories: [demo,blog]
tags: [front-end,css]
---
##学习内容
在家没事，学习几个css的标签也是蛮有意思。用学习的内容写了一个小玩意！
####css标签
1.box-shadow [块级元素对应阴影大小]  
2.border-radius [定义圆角的大小，当值为50%的时候]   
3.animation [设置动画的时间]    
4.@keyframes[自定义动画]

box-shadow与border-radius都是在原来图形的基础上进行定义的，如原来图形有多大，box-shadow就是
块级元素相应的大小。  

<!-- more -->

本来是想通过原生的js来操作dom元素，奈何每次添加元素都要操作一次，消耗实在是有点吃不消。其间我的
电脑CPU使用率直线上升，就改用了jquery来操作，结果还能让人接受。


	<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
        <title>moon and stars</title>
    </head>
	<style type="text/css">
		
			background-color: rgb(0, 7, 58);
		}

		#moon{
			width: 200px;
			height: 200px;
			margin: 30px;
			/* box-shadow: 4px 4px 3px #ccc; */

			box-shadow: 50px 4px 3px #000;
			border-radius:50%;
		}

		.star{
			width: 10px;
			height: 10px;
			position: absolute;
			background-color: #F7E16F;
			border-radius:50%;
			animation:myfirst 3s;
			-moz-animation:myfirst 3s; /* Firefox */
			-webkit-animation:myfirst 3s; /* Safari and Chrome */
			-o-animation:myfirst 3s; /* Opera */

		}

		/* 规定动画 */
		@keyframes myfirst{
			0%   {background:rgba(247, 225, 111, 0.38);}
			50%  {background:rgba(247, 225, 111, 0.66);}
			100% {background:#F7E16F;}
		}

		@-moz-keyframes myfirst /* Firefox */
		{
			0%   {background:rgba(247, 225, 111, 0.38);}
			50%  {background:rgba(247, 225, 111, 0.66);}
			100% {background:#F7E16F;}
		}

		@-webkit-keyframes myfirst /* Safari and Chrome */
		{
			0%   {background:rgba(247, 225, 111, 0.38);}
			50%  {background:rgba(247, 225, 111, 0.66);}
			100% {background:#F7E16F;}
		}

		@-o-keyframes myfirst /* Opera */
		{
			0%   {background:rgba(247, 225, 111, 0.38);}
			50%  {background:rgba(247, 225, 111, 0.66);}
			100% {background:#F7E16F;}
		}


    </style>
    <body  id="sky"> 
    	<div id="moon" ></div>
    	<script src="./jquery.min.js"></script>
    	<script >
    		/*生成小星星*/
    		var winWidth = window.screen.width
    			,winHeight = window.screen.height
    			,body = document.body;
    
    		/*生成小星星*/
    		function bling(){
    			var num = 20;
    			var _html='';
    			for (var i = 0; i <num; i++) {
    				var x = Math.floor(Math.random()*winWidth);
    				var y = Math.floor(Math.random()*winHeight);
    		        _html += "<div id='starKing' class='star' style='left:"+x+"px; top:"+y+"px;'></div>" 
    			}
    			$("body").append(_html);

                setTimeout(function(){bling();},2000);
    		};
    
    		/*移除星星防止div过载*/
    		function removeDiv(){
    		
    			$(".star").remove();	

                setTimeout(function(){
                    removeDiv();    
                },4000);
    		}
                        
            bling();
            removeDiv();
    	</script>
    </body>
    </html>

其中，肯定还是有很多的不足，在以后会慢慢改进。

####display:none与visibility:hidden的区别
1.空间占据   
2.回流与渲染   
3.株连性  
display:none不会占用空间，而visibility:hidden仍然会占用空间；   
display:none会产生reflow和repaint(回流与渲染事件)；   
株连性：就是对子元素是否有影响。其中使用了display:non，则他的子元素与本身都会消失；而visibility:hidden
使用后，虽然子元素也会隐藏，但是通过visibility:visible可使子元素显示。  


####常用css元素隐藏

    {position: absolute; top: -999em;}        /* 不占据空间，无法点击,通过缩进文本，实现隐藏 */ 
    
    {position: relative; top: -999em; }       /* 占据空间，无法点击 */ 

    {position: absolute; visibility: hidden;} /* 不占据空间，无法点击 */

    {height: 0; overflow: hidden;}            /* 不占据空间，无法点击 */ 

    
学习网址：http://www.jb51.net/web/73987.html