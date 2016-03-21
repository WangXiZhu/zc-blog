title: html5-draggable
tags: [百度面试,html5,drop,drag]
date: 2015-09-19 10:01:33
categories: blog

---
##概述
昨天去百度面试了，妥妥的接受了一波打击。再一次证明自己的基础是相当的不牢固，而且以前学习知识也有点浅尝辄止的感觉。学了新的东西就沾沾自喜，而现在一定要静下心来学习，多多发散思维。

##定义
拖(drag)放(drop)，我们就围绕这两个字扩展。

1.首先要允许拖元素。

    <div draggable="true"></div>

2.允许传送数据

	<div id="drag" draggable="true" ondragstart="drag(event)" ></div>

3.定义放置的位置
	
	<div id="container"></div>

<!-- more -->

4.接受数据
    
    <div id="container" ondragover="dragover(event)" ondrop="drop(event)"></div> 
    //js目标元素中保存数据 
    ev.target.appendChild(document.getElementById(data));
    

5.阻止本身事件     
drop 事件的默认行为是以链接形式打开，则调用 preventDefault() 来避免浏览器对数据的默认处理。
	
    ev.preventDefault();	
    
    
####涉及事件

* 被拖动的元素发生顺序
	dragstart-->drag[持续发生]--dragend
	* dragstart:<b>拖动什么</b>
		按下鼠标键并开始移动鼠标时，会在被拖放的元素上触发dragstart事件。但会出现一个有斜线的圆，表示不能将元素放置在现在的位置上。
	* drag:<b>进行放置</b>
		触发dragstart事件后，便触发。而且一直持续发生。
	* dragover
		拖动停止时,即鼠标空开，即使元素没有移动。

* 元素拖动到放置的位置发生顺序
	dragenter-->dragover[持续发生]-->dragleave或drop
	* dragenter:只要元素被拖动到放置目标上，就会触发dragenter事件
	* dragover:<b>放到何处</b>，如果被拖动的元素在放置目标的范围内移动时，就会持续触发该事件。若不在目标元素内，则停止该事件。但会触发dragleave事件。
	* dragleave：元素离开目标元素时触发。


##dataTransfer对象
为了在拖放操作时实现数据交换，IE 5引入了dataTransfer对象，它是事件对象的一个属性，用于从被拖动元素向放置目标传递<b>字符串格式</b>的数据。

####访问器与修改器
期间允许指定各种MIME类型。如“Text”与“URL”,但是会被映射为“text/plain”和“text/uri-list”。

* setData()
    
    
    event.dataTransfer.setData("Text", "some text");
    event.dataTransfer.setData("URL", "HTML://www.w3cmm.com/");

* getData()

    
    //获取文本数据
	var dataTransfer = event.dataTransfer;
    //读取URL
    var url = dataTransfer.getData("url") || dataTransfer.getData("text/uri-list");
    //读取文本
    var text = edataTransfer.getData("Text");


###后续
栗子链接地址：[请戳这里](http://htmlpreview.github.io/?https://github.com/WangXiZhu/Learning_Demo/blob/master/html5_draggable/index.html)

学习地址：[http://www.w3cmm.com/html/drag.html](http://www.w3cmm.com/html/drag.html)