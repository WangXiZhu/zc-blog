title: css selector
date: 2015-08-23 20:17:42
categories: blog
tags: [front-end,css]
---

## css选择器

每次看了东西又搞忘了，非要好好来总结一下才可以。这次学习的内容是关于css选择器。包括了以下内容。

* css(3)伪类选择器
* css选择器的权重与优先级
* css标签的匹配原理
* css优化

<!-- more -->
### css伪类选择器
css2中比较有特点的就是连接的伪类 :hover 、 :active 、 :link 、:visited

    a:hover     动态伪类选择器：鼠标停留的元素   
    a:active    动态伪类选择器：寻找被激活元素（链接被单击）
    a:link      链接伪类选择器：没有被访问过的链接
    a:visited   链接伪类选择器：访问过的伪类

举个例子

    //css代码：
        a:link{text-decoration: none;}
		a:visited{text-decoration: underline;}
		a:hover{text-decoration: underline;color: blue;}
		a:active{text-decoration: none;color:#cccccc;}   
        
    //html代码
    <a href="http://wangxizhu.gitcafe.io" target="_blank">个人博客</a>

由于css<b>层叠</b>作用，所有要注意顺序。因为:link与:active将覆盖:hover与:visited。为了避免此问，以下为简记方式。

书写顺序：LOve:HAte(爱恨)

### css3新增选择器
    
    nth-child(2)    //选择属于其父元素的第二个子元素的每个 <p> 元素。  
    
    nth-child(even) //元素的偶项，即兄弟元素奇偶可以通过关键字even和odd来实现，也可以通过2n与2n+1
    
    nth-lash-child(n)  //与nth-child(n)相反，从后开始计数
    

常见例子

    p:first-of-type //选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
    p:last-of-type  //选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
    p:only-of-type  //选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
    p:only-child    //选择属于其父元素的唯一子元素的每个 <p> 元素。
    
    :enabled        //启用的元素
    :disabled       //禁用的元素
    :checked        //选中的元素
    
###css选择器优先级与权重
选择器的优先级我们通常使用的内联是优先于外嵌的，而且id选择器也高于class选择器。
    !important > 内联 > ID > 类 > 标签 | 伪类 | 属性选择 > 伪对象 > 继承 > 通配符 通配符 > 继承
    
#### 权重
1、通配选择符的权值 0,0,0,0

2、标签的权值为 0,0,0,1

3、类的权值为 0,0,1,0

4、属性选择的权值为 0,0,1,(0,0,1,0)

5、伪类选择的权值为 0,0,1,0

6、伪对象选择的权值为 0,0,0,1

7、ID的权值为 0,1,0,0

8、!important的权值为最高 1,0,0,0

结论：

* 权值的大小跟选择器的类型和数量有关
* 样式的优先级跟样式的定义顺序有关

举个例子：[栗子](http://www.zhangxinxu.com/study/201208/256-class-fire-an-id.html)(使用IE查看，FF、Chrome都修复了此bug)

由于所有的类名(classes)都是以8字节字符串存储的。8字节所能hold的最大值就是255. 当同时出现256个class, 势必会越过其边缘，溢出到id区域。


### css标签匹配原理
从右到左 如：DIV#divBox p span.red{color:red;} 先查找html中所有class=’red’的span元素，
找到后，再查找其父辈元素中是否有p元素，再判断p的父元素中是否有id为 divBox的div元素，
如果都存在则CSS匹配上。 目的：为了尽早过滤掉一些无关的样式规则和元素。

学习资料:
http://www.w3school.com.cn/cssref/css_selectors.asp
http://www.cnblogs.com/aaronjs/p/3156809.html
