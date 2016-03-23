title: javascript类型
date: 2015-08-13 23:02:50
categories: blog
tags: [front-end,javascript]
---

## javascript类型
在javascript中每一个都有自己的类型，但是我们获取类型的方式去不相同。其中我们不仅会获取单一对象的
属性，而且可能还会涉及到两个对象之间的比较。

<!-- more -->

#### "=="与"==="  
*  javascript是弱类型的语言，所以在使用“==”进行比较时，会对两个值进行强类型转换。如 "0" == 0,
会首先对字符串"0"进行转换为数字，再与0进行比较。
*  "==="则是严格的操作符，作用类似我们c语言中的指针和java中的对象操作。所以它不会进行强制类型转换
因此性能也会好一点。

#### typeof
它最根本的是来检查对象是否定义，在大多数情况下会返回object.所以我们一般使用object.prototype.string来获取一个对象的类型
    
    Object.prototype.toString.call(2)    // "[object Number]" 

#### instanceof
用来比较两个对象的构造函数，通常我们是比较自定义的两个对象。   
但是intanceof是需要根据在同一上下文中，及内部的对象指代应该一致。  

#### 类型转换
如同之前的相等符“==”，在进行对象操作时会出现类型的转换。

    '' + 10 转为 '10'
    +'10' 转为 10
    
    //如果我们使用两次 否 操作符 ，则转为布尔型
    !!'0' 转为 true

#### 一元操作符

使用一元操作符可以把对象转换为数字 ，如字符串、日期等

    输入值         结果
    +null          0
    +new Date()    标准时间转为毫秒数
    +undifined     NAN(对于不能转数字的结果都为0) 


#### 学习资料
[js上下文](http://www-hanghuazou-163-com.iteye.com/blog/1462561)

