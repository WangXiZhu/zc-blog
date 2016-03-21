title: JQuery中$.ajax()与$.post()方法的比较
date: 2015-06-04 07:56:29 
categories: blog
tags: [front-end,jquery]    #文章标签，多于一项时用这种格式

---
##JQuery中$.ajax()与$.post()方法的比较
###$.ajax()的常用方式
```javascript
$.ajax({        
    type:"POST",
    url:"jsonController/getJson.do",  
    data:{td_tempName:tempName},  
    //防止自动转换数据格式。  
    async:false,  
    success:function(result){  
      theadEditorInfo=result;
    }      
});
```

###$.post()常用方式
$.post()算是$.ajax()的一种变体了，它的默认加载数据的方式为异步，如果设置为同步的话
```javascript
$.ajaxSetup({  
    async : false  
});
 
$.post("jsonController/getJson.do",{parameter:parameter},function(result){
    if(result)
        var data=result;
});
```