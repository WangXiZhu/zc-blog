title: css3-flex-grid
tags: [css3]
date: 2016-01-16 00:05:01
categories: [front-end] 
---

## css3-flex

弹性盒子自找工作的时候才知道这个名词，但是并没有怎么深入。今天打算好好研究一下，同时关注一下css3(4)的栅栏布局grid，貌似更强大。

主流的浏览器大多是支持的，	而现在开发移动端web,android4.4以上也是完全支持的。

![http://7xklhg.com1.z0.glb.clouddn.com/caniuse-flex.png](http://7xklhg.com1.z0.glb.clouddn.com/caniuse-flex.png)


<!-- more -->

##flex专业名词
* flex item
flex子类条目

flex-item长度的计算

下面是关于flex-grow、flex-shrink、flex-basis等三个属性在不同值下对应的flex-item的宽度
的在线demo，多玩几次就明白了。
[http://madebymike.com.au/demos/flexbox-tester/](http://madebymike.com.au/demos/flexbox-tester/)


* flex-grow
默认值：0  继承性：无

设置或检索弹性盒的扩展比率。根据弹性盒子元素所设置的扩展因子作为比率来分配<b>剩余空间</b>。
(PS：一般是 (父容器.width－所有子items.width) / items.length + item.length[每个item的长度])

* flex-basis
语法： flex-basis：<length> | <percentage> | auto | content
auto：无特定宽度值，取决于其它属性值
content：基于内容自动计算宽度,这样情况item为0px

* flex-shrink
value: number(>0)
定义收缩比率，根据设置值来收缩空间，同时元素始终在父元素内部

* flex-direction

定义弹性子条目的方向
	
	.container {
	  flex-direction: row[行] | row-reverse | column[列] | column-reverse;
	}

* flex-wrap
	当items出现一行放不下的情况，这个属性就有效了。

	.container{
	  flex-wrap: nowrap[默认值,受元素定义的书写方向的影响] | wrap | wrap-reverse;
	}

* justify-content
	这个属性作用还是挺大的。
	调整内容，帮助元素分配剩余空间。当不是所有的子条目都在同一方向上并且都不是弹性的，或者是弹性但是已经达到他们的最大值。

	.container {
	  justify-content: flex-start | flex-end | center(水平均匀分布) | space-between | space-around;
	}

* align-item[另外一个重点]
	弹性子元素如何在当前垂直线上分布。
	.container {
	  align-items: flex-start | flex-end | center(垂直均匀) | baseline | stretch;
	}

* flex
	flex是flex-grow, [flex-shrink] 和 [flex-basis]的缩写。默认值为 0 1 auto
	即我们使用来设置容器为弹性盒子。
	.item {
	  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
	}

##优点
自适应各种屏幕

##缺点
一维的，只能在同一方向上进行布局，所以就水平（horizontal）和垂直两个方向

##使用
	
	xx{
		display: flex;||
		display: inline-flex;(类比inline-block)
	}
这里将容器设置为弹性盒子，而它的内部的<b>所有元素</b>就变为了弹性子元素

##注意点
弹性盒子的布局逻辑
	* 多列布局 中的column-*属性对弹性子元素无效。
	* float 和 clear 对弹性子元素无效。使用 float 会导致 display 属性计算为 block.
	* vertical-align 对弹性子元素的对齐无效。

##Demo

1.水平垂直居中（简直了）

	.vertical-container {
		  height: 300px;
		  display: -webkit-flex;
		  display: flex;
		  -webkit-align-items: center;
          align-items: center;
		  -webkit-justify-content: center;
          justify-content: center;
	}

##Grid layout
Grid 表格布局 二维布局 相比flex可以对两个方向同时设置，但是浏览器对其支持目前不是很好。

![http://7xklhg.com1.z0.glb.clouddn.com/caniuse_grid.png](http://7xklhg.com1.z0.glb.clouddn.com/caniuse_grid.png)

正是由于是二维的，所以我们可以定义行(row)、列(column). 感觉有点类似栅栏布局，不知道bootstrap是不是也是这种思想。

由于网格容器不是块容器，所以部分属性会失效。类似于flex

###术语
1.网格容器(Grid containers)
	value: grid || inline-gird

2.网格轨道(Grid Track)
	两条相邻的平行网格线中间的区域，就是行（column）与列(row)。可以用来控制高度与宽度。

3.网格线(Grid Lines)
	用于来规划网格，起到单元化的作用

4. ‘fr’	（fraction of available space）
	即所有剩余以设置的元素宽度达到最大后的剩余宽度，网格容器中额外空间
	类似flexbox的box

5.grid-row-span/grid-column-span

6.grid-template［网格模板］ 

	允许通过模板定义网格。

7. grid item(类比flex-item)
	都是容器内的单元内容

8. 分层:z-index
	在重叠分部分通过z-index来分层
##优点
让布局(css)和标记语言(html)真正地分离
	
	网格完全是用css定义的。同时它的子类都不需要重新去定义区域，类名或id。目的轻量、易懂。更关键的是我们不会因为样式破坏其他的布局，现在是越来越期待了。

![https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2015/09/1-zcOcwuBtMoBaUfHHAJPNyg2.png](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2015/09/1-zcOcwuBtMoBaUfHHAJPNyg2.png)

同时我们还可以使用媒体查询来响应设备

##学习资料

* [https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

* [https://css-tricks.com/snippets/css/a-guide-to-flexbox/](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

* [http://segmentfault.com/a/1190000002437544](http://segmentfault.com/a/1190000002437544)

* [https://css-tricks.com/snippets/css/complete-guide-grid/](https://css-tricks.com/snippets/css/complete-guide-grid/)

* [https://hacks.mozilla.org/2015/09/the-future-of-layout-with-css-grid-layouts/](https://hacks.mozilla.org/2015/09/the-future-of-layout-with-css-grid-layouts/)

* [http://www.css88.com/book/css/properties/flex](http://www.css88.com/book/css/properties/flex)