---
title: css3-animation-performance
date: 2016-03-29 17:04:56
categories: blog    #文章文类
tags: [css3,animation,performance]
---


### 动画与性能
  在前端的活动开发中经常会遇到动画。在pc端往往看到的“正常”的动画在移动端却不正常。有的会出现“卡顿”和闪烁的现象。
  在了解动画之前，首先了解一些概念


#### 动画名词概念

* 帧： 在动画过程中，每一幅静止画面即为一“帧”
* 帧率：即每秒钟播放的静止画面的数量，单位是fps(Frame per second)
* 帧时长：即每一幅静止画面的停留时间，单位一般是ms(毫秒)
* 跳帧(掉帧/丢帧)：在帧率固定的动画中，某一帧的时长远高于平均帧时长，导致其后续数帧被挤压而丢失的现象
* 图层：用html片段放置在常规页面的页面。[css layers](http://www.echoecho.com/csslayers.htm) 通过z-index属性来控制重叠的顺序。 常见的层模型有 relative 和 absolute(fixed)等几种。

##### 合成层(图层)

 那么动画是如何播放的，我们就涉及到了合成层。每个合成层对应了一个GPU纹理，所以它和内存息息相关。在超过一定范围，可能引起浏览器崩溃，观察数量是我们了解的最直接的方法。
 -  chrome？
  其中chrome有很多层，包括了RenderLayer(负责 DOM 子树)，GraphicsLayer(负责 RenderLayer 的子树)。
   chrome中如何显示层，打开chrome://flags/#composited-layer-borders启用，然后打开开发工具勾选Show composited layer borders。

<!-- more -->


![](http://7xklhg.com1.z0.glb.clouddn.com/chrome-open-layer-border.png)
   
  结果如下

  ![](http://7xklhg.com1.z0.glb.clouddn.com/chrome-show-borders.png)
  
  这个页面只有一个层，其中蓝色的网格表示瓦片(tile)，他们作为层的单元。
 


创建层的标准,具体一下几种情况
* 3D 或透视变换(perspective transform) CSS 属性
* 使用加速视频解码的 元素
* 拥有 3D (WebGL) 上下文或加速的 2D 上下文的 元素
* 混合插件(如 Flash)
* 对自己的 opacity 做 CSS 动画或使用一个动画 webkit 变换的元素
* 拥有加速 CSS 过滤器的元素
* 元素有一个包含复合层的后代节点(换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里)
* 它的兄弟元素在复合层中渲染，而这个兄弟元素的z-index比较小（也会放到复合层）

 - 对于Firefox，打开about:config然后设置layers.draw-borders为true

##### 浏览器中DOM到屏幕

 经常面试会问到这个相关的问题。“浏览器访问过程发生的事情？”。讲到渲染的时候，都是html dom tree + css stylesheet = render tree。那么更具体一点的呢？
  
   1.获取 DOM 并将其分割为多个层
   2.将每个层独立的绘制进位图中
   3.将层作为纹理上传至 GPU
   4.复合多个层来生成最终的屏幕图像。
   
   层是不是越多越好呢？并不是，层会占用系统 RAM 与 GPU(在移动设备上尤其有限)的内存，并且拥有大量的层会因为记录哪些是可见的而引入额外的开销。所以我们应该控制


#### 动画的种类

* css
	* css dom animation
	* svg animation
* javascript
	* javascript dom animation
	* canvas animation
	* webGL
* jquery


##### 动画如何选择

  动画方案以上几种，我们如何选择合适的，高性能的动画呢？
  
  js动画通过操作DOM元素修改样式来是实现动画，在PC端兼容低端浏览器更占优势。


*优点：更好的控制。如动画的开始，结束以及监听动画*
*缺点：js本身是单线程，其他的js可能对其干扰，造成线程阻塞，引起“丢帧”现象*
 
  在移动端，我们选择性能更优的css3动画！它由浏览器来执行。但是移动端本身的特殊性，性能成为一大痛点。
*优点：浏览器能对动画进行优化。使用图层，这样在主线程外运行*
*缺点：控制力弱，难以实现动画的有序显示*

  jquery在选择引擎效率确实很快，但是在动画方面不占优势。原因是经常触发垃圾回收（导致动画运行过程中的卡顿）。以及不能避免的[layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/)（导致在动画开始卡顿），多余的relayout/reflow。
	

#####  什么是硬件加速

  浏览器不会在动画的每一帧都绘制一次，而是生成DOM元素的快照，并作为GPU纹理（也被叫做层）存储起来。之后浏览器只需要告诉GPU[擅长图形计算]去转换指定的纹理来实现DOM元素的动画效果。这就叫做GPU合成，也经常被称作『硬件加速』。
 
*缺点：消耗用户设备电量，消耗电池寿命*

硬件加速原理
*渲染树，每个渲染对象都会指定到一个图片层，并作为结构上传到GPU  。是由几个cpmpositor进程处理的。当动画结束，这个层（GPU纹理）会被移除 。*

##### 动画调优的策略与技巧

通过一张图来总结展示一下
![](http://7xklhg.com1.z0.glb.clouddn.com/web-animation-libraries-C2.jpg)


- 提升每一帧性能（缩短帧时长，提高帧率）
    - 避免频繁的重排（layout）。
    - 避免大面积的重绘（repaint）。
    - 优化JS运行性能。
- 保证帧率平稳（避免跳帧）

    - 不在连续的动画过程中做高耗时的操作（如大面积重绘、重排、复杂JS执行），避免发生跳帧。
    - 若高耗时操作无法避免，则尝试化解，比如：
        - 将高耗时操作放在动画开始或结尾处。
        - 将高耗时操作分摊至动画的每一帧中处理。


- 针对硬件加速渲染通道的优化
    - 通过层的变化效果(如transform)实现位移、缩放等动画，可避免重绘。
    - 合理划分层，动静分离，可避免大面积重绘。
    - 使用分层优化动画时，需要留意内存消耗情况（通过Safari调试工具）。


##### 如何提高移动端动画体验


1、移动端直接GPU来加载动画的,如3D变形
	
	transform: translate3d(0, 0, 0);  
	
2、每个设备的GPU渲染最好是在60fps(frames per second)以下。因为浏览器
3、使用良好支撑GPU的css属性

- opacity
- translate
- rotate
- scale

4、使用transform hack来加速硬件
		
	
	//当有闪烁的时候
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	
	-webkit-perspective: 1000;
	perspective: 1000;	

	//使用translate3d代替position:left||right 进行位移
5、少使用box-shadows与gradients
6、尽可能的让动画元素不在文档流中，以减少重排，用到z-index
7、优化DOM layout性能
批量访问和更新DOM，减少操作、layout thrashing
	 
	 top = element.style.top;  //访问
     left = element.style.left; //访问
		
	 element.style.top = top + 10; //更新
	 element.style.left = left + 10;  //更新
8、js方面避免setTimeout,setTimeInterval。

9、使用3D硬件加速时，添加z-index人为干扰复合层排序，减少浏览器创建不必要的复合层，提高渲染性能

##### 影响重排属性（物理结构改变的属性）

|   1   |  2   |   3  |  4 |
| :-------- | :--------| :------ | :------ |
|width	|height | padding	| margin |
|display |	border-width |border	|top| 
|position	|font-size| float|	text-align|
|overflow-y	|font-weight| overflow	|left|
|font-family	|line-height | vertical-align	|right |
|clear	|white-space | bottom	| min-height|

##### 影响重绘属性（一些外表样式上的属性-皮肤）

|   1   |  2   |   3  |  4 |
| :-------- | :--------| :------ | :------ |
| color	| border-style | visibility	|  background| 
| text-decoration	| background-image| background-position| background-repeat| 
| outline-color	| outline | outline-style	| border-radius| 
| outline-width	| box-shadow| background-size

##### 动画API

- requestAnimationFrame： RAF机制
 <del>作用类似setTimeout(fn,0),但是它能让所有的DOM在下一个frame中运行</del>
 准确来说，它的功能类似underscore中的 throttle(节流)。当我们在浏览器中加载动画时，它是一个起到让动画流畅的保证。(PS：IE9不支持)
  - requestAnimationFrame 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
  - 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

 
[requestAnimationFrame实例](http://jsbin.com/ebicuJu/2/edit?js,output)：是否使用requestAnimationFrame的差别

	var h1 = element.clientHeight;
	requestAnimationFrame(function(){
		element.style.height = (h1 * 2)+ 'px';
		var height = element1.clientHeight;
	});


- 监听 transitionend
		
		var box = document.querySelector(".box");
		box.addEventListener('transitionend', onTransitionEnd , flase);
		
		function onTransitionEnd(){
			//handle the transition
		}


##### 动画库
- velocity.js
- animation.css
- [GSAP](http://greensock.com/gsap)
	- 比jquery快20倍，移动设备上也很流畅
	- 兼容性良好，完爆
##### 学习资源
- [http://alexorz.github.io/animation-performance-guide/](http://alexorz.github.io/animation-performance-guide/)
- [http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/](http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/)
- [http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
- [http://www.awwwards.com/web-animation-infographics-a-map-of-the-best-animation-libraries-for-javascript-and-css3-plus-performance-tips.html](http://www.awwwards.com/web-animation-infographics-a-map-of-the-best-animation-libraries-for-javascript-and-css3-plus-performance-tips.html)
- [https://davidwalsh.name/css-js-animation](https://davidwalsh.name/css-js-animation)
- [http://www.html5rocks.com/zh/tutorials/speed/layers/](http://www.html5rocks.com/zh/tutorials/speed/layers/)
- [debounce,throttle,rAF](https://css-tricks.com/debouncing-throttling-explained-examples/)