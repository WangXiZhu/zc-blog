title: editable select
date: 2015-08-09 09:57:17
categories: blog    #文章文类
tags: [html,javascript] 
---
## 可编辑下拉框
#### 实现思路
利用一个input框实现显示值和可编辑的功能，而下拉框则完成下拉的功能。

其中较为痛苦的就是input框和select的布局问题，将两个标签定义在相同的位置上以实现合二为一，来制作可编辑下拉框 

<!-- more -->

    <!DOCTYPE html>
    <html>
      <head>
          <meta charset="UTF-8">
          <style type="text/css">
              #container{
                  position:relative; width: 240px;height:20px;margin-bottom:10px;margin-left:26px;
              }
              #slct{
                  float: right; height: 22px;width: 140px; z-index:88; position:absolute; left:70px; top:0px;
              }
              
              #txt{
                  position:absolute; width:118px; height:14px; left:71px;top:1px;z-index:99; border:1px #FFF solid;
              }
          </style>
        
      </head>
      <body>
          <div id="container">
              <span>选择值：</span>	
              <select id="slct"  name="selectedApp" onchange="select(this.value);">
    				<option value="111">111</option>
    				<option value="222">222</option>
    				<option value="333">333</option>
    		  </select>
    	      <input type="text" name="app" id="txt" value=""/>  
    	  </div>
    	  <script>  
    			function select(value) {
    			   document.getElementById('txt').value = value;
    			}
          //方式2,原生javascript
          function changeApp(){
             var select = document.getElementsByName("selectedApp")[0];
             document.getElementsByName('app')[0].value = select.options[select.selectedIndex].value;
          }
    	  </script>
       </body>
    </html>


        