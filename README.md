## 我的博客
网上参考别人的文章，基于[travis](https://travis-ci.org/)自动构建hexo来避免发布需要的大量步骤！但是编译中也非常麻烦。好处就是在不同电脑上发布博客，而不用配置HEXO需要的一些环境。但是由于使用GIT发布，还是会需要node环境。

本地环境：Mac
##### 步骤
申请账号

安装travis
 
> brew install ruby              //依赖ruby
> sudo gem install travis             //安装 travis-ci，可能涉及到权限问题


由于网络原因，可能发生安装失败的情况
		
	gem sources //查看源，如果有https://rubygems.org/，则移除，并添加https://ruby.taobao.org/ 。没有直接add就可以。

	gem sources --add https://ruby.taobao.org/ 
		
	gem sources --remove https://rubygems.org/      //切换下载地址

切换到需要编译的项目下

	travis login --auto      //登录账号，会提示输入密码。之前可能会请求是否访问你的.sshkey,直接否定就可以了

加密你的id_rsa

> 由于travis的一系列操作会涉及到id_rsa，但是我们不能直接将id_rsa直接提交到项目中，这样不安全。那么就需要travis来进行加密
		
	open ~/.ssh/      //复制id_rsa到你要发布的项目中（travis需要编译的项目）
	travis encrypt-file id_rsa --add     //生成id_rsa.enc文件，则成功
	删除id_rsa文件，切记！！！

提交你的项目(REPO)

> git的一系列操作
> git add 
> git commit
> git push origin master
> 当你的博客push到github上，可以在[travis](https://travis-ci.org/)上看见编译过程

