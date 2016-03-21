title: css3 animation
date: 2015-08-18 23:12:15
categories: blog    #文章文类
tags: [front-end,css3,animation]
---
##css3动画示例
昨天在去哪儿的校招网上看到一个动画做得还不错就没忍住就多看了一下。于是看了看源码发现“哇哦，原来是这样的”
，在这里记下笔记。多学多看总是好滴！ 

<!-- more -->
    
    /**
     * 定义X轴弹性动画
     * @method elastic-x
     * 使用方式，code: 
       <div class="ani elastic-x"...
    */
    
    .ani{
    	  -webkit-animation-duration: 1s;
    	  animation-duration: 1s;
    
    	  -webkit-animation-fill-mode: both;
    	  animation-fill-mode: both;
    }


    
    .ani.infinite{
          -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;	 /*	重复的次数 */
    } 
    
    
    @keyframes elastic-x{
        0%,20%,100%{
    		transform: translate3d(0, 0, 0);
    	}
    	30%{
    		transform: translate3d(20px, 0, 0);
    	}
    	50%{
    		transform: translate3d(-20px, 0, 0);
    	}
    	65%{
    		transform: translate3d(10px, 0, 0);
    	}
    	80%{
    		transform: translate3d(-10px, 0, 0);
    	}
    	90%{
    		transform: translate3d(5px, 0, 0);
    	}
    }
    

而其他的淡入的动画就相对来说比较简单，只是显示了出来，并没有来回的动画。


    /* 淡入落下动画 */
    @keyframes fade-in-down{
        0%{
    		opacity: 0;
    		transform: translate3d(0, -100%, 0);
    	}
    	100%{
    		opacity: 1;
    		transform: translate3d(0, 0, 0)
    	}
    }
    
    /* 从左淡入动画 */
    @keyframes fade-in-left{
        0%{
    		opacity: 0;
    		transform: translate3d(-100%, 0, 0);
    	}
    	100%{
    		opacity: 1;
    		transform: translate3d(0, 0, 0)
    	}
    }
    
    /* 从右淡入动画 */
    @keyframes fade-in-right{
        0%{
    		opacity: 0;
    		transform: translate3d(100%, 0, 0);
    	}
    	100%{
    		opacity: 1;
    		transform: translate3d(0, 0, 0)
    	}
    }
    
    
    /* 向上淡入动画 */
    @keyframes fade-in-up{
        0%{
    		opacity: 0;
    		transform: translate3d(0, 100%, 0);
    	}
    	100%{
    		opacity: 1;
    		transform: translate3d(0, 0, 0)
    	}
    }
    
    
##css3 transform属性
这里主要是通过translate3d(x,y,z)来实现的。

    translate3d(x,y,z);         //分别定义在x、y、z轴上移动的距离

在很多地方通过 translate(x,y)的方式也能实现。

    scale(x,y);         //2D缩放
    scale3d(x,y,z)；    //3D缩放
    rotate(angle);      //2D旋转
    rotate3d(x,y,z,angle);  //3D旋转
    skew(x-angle,y-angle);  //2D倾斜转换
    