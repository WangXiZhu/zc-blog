title: 通过js获取元素宽度
date: 2015-08-17 17:17:11
categories: blog
tags: [javascript,DOM]
---
##js获取元素宽度
通常一般会想到的就是通过width来获取
    
    var demo_width = document.getElementById("demo").style.width;

<!-- more -->

但是能通过这样的方式来获取的前提是在html代码中通过内嵌的方式定义的元素

    <div id="demo" style="width:100px;height:100px;">
    
那么如果我们如果是通过内联或者外联的写CSS样式就不能获取元素的宽度，那么我们就必须通过
offsetWidth或者clientWidth等其他方式来获取元素的宽度。

    var demo_width = document.getElementById("demo").style.offsetWidth;
    
####clientWidth与offsetWidth的区别
* clientWidth是元素的可见宽度[包含了padding的宽度：padding*2]
* offsetWidth是元素的宽度[包含了边框的宽度：border*2]

####getAttribute()来获取宽度
通过获取属性的值来获取宽度，那么宽度就必须定义在html的代码中
    
    //定义html代码
    <div id="demo" width="100px">
    
    //获取元素宽度
    var demo_width = document.getElementById("demo").getAttribute('width');
    
####补充

    element.offsetParent;       //返回元素的偏移容器
    element.offsetTop;          //返回元素的垂直偏移位置
    element.scrollWidth;        //返回元素的整体宽度,结果同clientwidth