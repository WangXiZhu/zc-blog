---
title: react-freshman
date: 2016-07-24 21:41:08
tags: [react]
categories: [javascript]
---

### 简述

  随着react的快速发展，越来越多的公司在项目中的前端技术上都会考虑react,并且有越来越多成熟的应
用和项目证明了 react的优势所在，而目前蚂蚁金服开发的 ant-design 也被开发者使用，目前在 github
的排名还是挺高的。目前我们公司就是使用的技术栈是  react + antd + es6！

### 概念
  作为新手，首先还是需要了解几个概念的。

  * state
  每个组件有自己对应的状态，里面通常保存一些需要进行动态交互的变量。如表单中控制输入框的字数


      var input = React.createClass({
        getInitailState : function(){
          return {
            inputValue: ''
          }
        },
        onChange : function(e){
          this.setState({
             inputValue = e.target.value
          })
        },
        render: function(){
          return (
              <div className='h'>
                <input type='textarea' value={this.state.inputValue} onChange={this.onChange}>
              </div>
          )
        }
      })

<!-- more -->

  * props
  用于父子组件之间传递数据的桥梁，子组件中可以通过 this.props.name 的方式来访问父组件传递的对象、方法。
最容易理解的就是子组件可以数据流的方式访问到变量，那在子组件中修改的数据如何保存到父组件呢？也是靠
this.props,但这时候就要在子组件的方法中调用该方法了



    var Parent = React.createClass({
      getDefaultProps : function(){
        return {
          name: 'zc'
        }
      },
      getInitailState : function(){
        return {
          name: this.props.name
        }
      },
      changeName : function(name){
        this.setState({
           name : name
        })
      },
      handleSubmit : function(){
        var name = this.state.name
        // ...upload
      },
      render: function(){
        return (
          <form onSubmit={this.handleSubmit}>
            <Child initData={this.state.name} changeName = {this.changeName}/>
          </form>
        )
      }
    })


    var Child = React.createClass({
      handleChange: function(e){
        this.props.handleChange(e.target.value)
      },
      render: function(){
        return(
          <input type='text'  value={this.props.initData} onChange={this.handleChange}/>
        )
      }
    })



  parent、child 组件中的数据通过 this.props.name 来进行传递,子类中通过 this.props.handleChange
来让父类控制父类state中 name 的更新。父类的state的 name 是数据来源，每次它的更新都会让子类重新渲染。

  而其中react 提供的几个生命周期方法，对我们大有帮助，由于生命周期，从开始到结束我们都能够调用
它提供的方法接口来编写我们的代码

* 实例化

  * getDefaultProps  
    设置默认的props值，只被调用一次（总共，无论是否在其他组件中使用）。在父类组件没有指定 props 属性

  * getInitailState  
    初始化当前组件的 state, 组件实例只调用一次

  * componentWillMount  
    react 渲染的过程同步，componentWillMount中的运行代码会阻塞组件的 render 过程。所以避免耗死的操作

  * render
    创建一个虚拟 DOM，用来展示组件
    1.只有一个顶级组件，通常用<div>标签包装
    2.千万不能调用 the.setState(),会引起重新render，然后就是死循环，然后... ，不要问我为什么...,你懂得!
    3.若使用 jsx(javascript xml)，标签都是闭合的

  * componentDidMount  
    当 DOM 渲染完毕可以通过 getDOMNode()的方式来获取节点，然后我们就可以对 DOM 进行一系列操作。
通常我们调用后台数据的方法可以写在这里。再使用 this.setState()对组件 render。若作为父组件中需要传入数据到
子组件中，而子组件需要访问其他数据，这里涉及到两次的刷新，如果在这时候在子组件中通过 componentDidMount 来请求数据，就不能满足。因为 componentDidMount 只在 组件加载的时候渲染一次。这时候 componentWillReceiveProps 出场了！

  * componentWillReceiveProps
  通过参数从父组件中获取值。


    componentWillReceiveProps(nextProps){
        nextProps.getProps()
        // do something
        // update the current state in the sub-component
        // then the component will render
    }


### 表单的约束与非约束

表单用来与用户进行交互，自然重要。
这里就涉及到表单组件的约束与非约束问题。顾名思义，约束肯定是需要一定的行为来控制它的表现（背后数据的改变）。 由于 react 实现了 DOM 大部分的方法（很多是直接拦截）。如 input、select 中的onChange事件。


    export default class Input extends React.component{
      component(props){
          super(props);
          this.state = {
            value: this.props.initValue
          };
          this.onChange = this.onChange.bind(this);
      }
      onChange(value){
          this.setState({
            value : value
          });
      }
      render(){
        return(
          <div>
            <input type='text' value={this.state.value}/>
          </div>
        )
      }
    }

  这里的 Input 组件可以通过修改它的值的大小，所以必须设置它的 value 属性才能进行更新。
