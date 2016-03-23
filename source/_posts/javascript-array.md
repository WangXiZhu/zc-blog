title: javascript array
date: 2015-08-19 15:11:05
categories: blog    #文章文类
tags: [front-end,javascript]
---

## javascript数组
昨天在做阿里巴巴的面试题时发现针对JavaScript Array考的问题还有记到，而且都是考原生的方法。
但部分在w3c上都没有见过，于是就查看了资料弄个究竟。    
这里就介绍了以下几个方法：sort()、forEach()、filter()、reduce()、join()

<!-- more -->
#### sort()
 <b>定义：</b>sort方法是字符编码ASCII的顺序进行排序。    
    
    //比较字符串
    var b=['a','d','c']
    b.sort()        //b = ["a", "c", "d"]
    
    //比较数字
    var a=[0,5,10,15];      //0的ASCII码为48,1的ASCII码为49
    a.sort();       //a = [0, 10, 15, 5]
    
 过程是通过比较两个参数值返回结果的大小来决定排列顺序,
 所以在比较数字的时候需要写函数来判断,如果结果>0，则交换顺序；结果<=0则不交换。
 
    //正确地比较数字
    sort(function compare(a,b){return b-a;})    //逆序
    sort(function compare(a,b){return a-b;})    //顺序


#### forEach()
 <b>定义：</b>数组的每个元素都执行方法
 
 <b>表达式：</b>array1.forEach(callbackfn[, thisArg])
 
* array1 【必选】  一个数组对象。
* callbackfn【必选】 最多可以接受三个参数的函数。 对于数组中的每个元素，forEach 都会调用 callbackfn 函数一次。
* thisArg【可选】 callbackfn 函数中的 this 关键字可引用的对象。 如果省略 thisArg，则 undefined 将用作 this 值。

<b>例子</b>

    //value为数字值，index为下标 ， ar该元素的数组对象，这里是letters；数组的每个元素执行都会调用callbackfn函数
    function ShowResults(value, index, ar) { 
        document.write("value: " + value); 
        document.write(" index: " + index); 
        document.write("<br />"); 
    } 
    letters.forEach(ShowResults); 

#### filter()
<b>定义：</b> 在匹配过滤条件后，创建一个新的数组。所以不会改变原数组。

<b>表达式：</b>array1.filter(callbackfn[, thisArg])


<b>callbackfn参数</b>

语法：

    function callbackfn(value,index,array1)

* 元素的值：[value]
* 元素的索引:[index]
* 被遍历的数组:[array1]

如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值。
否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined。

filter 遍历的元素范围在第一次调用 callback 之前就已经确定了。所以以后的操作不会遍历到！


<b>示例</b>

    function isBigEnough(element) {
      return element >= 10;
    }
    var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
    // filtered is [12, 130, 44]
####reduce()
 <b>定义：</b>数组缩减为一个数字。
  
 <b>表达式：</b>array1.reduce(callbackfn,[initialValue])[其中不同于以上函数，reduce的callback的参数有<b>四个</b>]

<b>参数说明</b>

* previousValue  : 上一次调用回调返回的值，或者是提供的初始值(initialValue)
* currentValue  :  数组中当前被处理的元素
* index : 当前元素在数组中的索引
* array  :  调用的数组
* initialValue : 作为第一次调用 callback 的第一个参数

<b>示例</b>

    [0,1,2,3,4].reduce(function(previousValue, currentValue, index, array){return previousValue + currentValue;});

<b>数组扁平化</b>

我的理解就是多维数组变为了一维数组。

    var flattened =[[0,1],[2,3],[4,5]].reduce(function(a, b){return a.concat(b);});
    // flattened is [0, 1, 2, 3, 4, 5]


#### join()
一个数组的所有元素连接成为一个字符串。   
    
    var ddd = [1,2,4,3,5];
    var str = ddd.sort(function compare(a,b){return b-a;}).join('+');
    // str = '5+4+3+2+1';

#### 测试

    ["1","2","3"].map(parseInt) 输出结果为

输出函数的解析过程,代码如下
    
    //map的callbackfn传入的参数如下
    
    var parseInt = function(value, index, array1) {
        return value + "-" + index+"-"+array1;       
        //["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]
    };
    
    ["1", "2", "3"].map(parseInt);
    
而parseInt可接受的参数为2个

    parseInt(string, radix);        //string为解析的字符串；radix解析的数字的基数，值为[2~36]
    
所以有
    
    parseInt("1","0");      //1
    parseInt("2","1");      //NaN
    parseInt("3","2");      //NaN

    
参考资料：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/