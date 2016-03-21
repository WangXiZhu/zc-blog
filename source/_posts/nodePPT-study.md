title: nodePPT
date: 2015-07-29 14:23:30
categories: [小玩意 , nodejs]
tags: [front-end]    #文章标签，多于一项时用这种格式
---
##NodePPT使用

想要酷炫的网页PPT吗？请看这里,直接戳代码! 

####1.首先是启用git,在本机上安装nodeppt
```javascript
$ npm install -g nodeppt
```
<!-- more -->

####2.安装完成后启动nodePPT   
首先因先知道你安装的目录地址，一般默认为
```javascript
//这里我使用的是8888这个端口
$ nodeppt start -p 8888 -d C:/Users/user-name(你的用户名)/AppData/Roaming/npm/node_modules/nodeppt

```
执行完这个命令后，浏览器会自动弹出窗口，提示你服务已启动，你可以浏览它的demo   
####3.创建PPT   

```javascript
//最好是自己使用的目录下新建文件，不然到时候找不到，所以可以先更换目录
cd d:/tonyspace/ppt

//生成.md的文件
$ nodeppt create firstPPT

//新建好后，窗口中会提示你输入一些基本信息
title:nodePPT测试   //PPT的标题
speaker:yourName   //演讲人
url:         //可以设置链接
transition: zoomin //设置ppt切换页面的效果
files:      //引入js和css的地址，如果有的话~自动放在页面底部
```
####4.编辑.md文件 

书写你自己的内容

####5.编译ppt
```javascript
 $ nodeppt generate firstPPT.md -a -o fisrtPPT.html
```
最后不要忘记“ctrl+c”关闭端口的服务   
看看同目录下是不是多了个文件，快欣赏下自己的成果吧！   
注：生成出的文件中的某些路径可能有问题，需要自己修改下
```javascript
  .css/nodeppt.css 
  //改为
  css/nodeppt.css
```