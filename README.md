## 我的博客
网上参考别人的文章，基于[travis](https://travis-ci.org/)自动构建hexo来避免发布需要的大量步骤！但是编译中也非常麻烦。好处就是在不同电脑上发布博客，而不用配置HEXO需要的一些环境。但是由于使用GIT发布，还是会需要node环境。

### 本地环境：Mac
### 步骤
##### 申请账号

##### 安装travis
 
> brew install ruby              //依赖ruby
> sudo gem install travis             //安装 travis-ci，可能涉及到权限问题


由于网络原因，可能发生安装失败的情况
		
	gem sources //查看源，如果有https://rubygems.org/，则移除，并添加https://ruby.taobao.org/ 。没有直接add就可以。

	gem sources --add https://ruby.taobao.org/ 
		
	gem sources --remove https://rubygems.org/      //切换下载地址

切换到需要编译的项目下
	
	
	cd your-blog-space       //切换到你所在的目录
	travis login --auto      //登录账号，会提示输入密码。之前可能会请求是否访问你的.sshkey,直接否定就可以了


##### 加密你的id_rsa

> 由于travis的一系列操作会涉及到id_rsa，但是我们不能直接将id_rsa直接提交到项目中，这样不安全。那么就需要travis来进行加密
		
	open ~/.ssh/      //复制id_rsa到你要发布的项目中（travis需要编译的项目）
	travis encrypt-file id_rsa --add     //生成id_rsa.enc文件，则表示成功

##### 新建.travis.yml文件
在项目下新建.travis.yml,
其中id_rsa是之前你生成的.SSH KEY的文件名，每个人对应的可能不一样。在上一步

> travis encrypt-file id_rsa --add 

执行之后，会自动生成以下文件。所以注意删减！
	
	- openssl aes-256-cbc -K $encrypted_xxx_key -iv $encrypted_xxx_iv
		-in id_rsa.enc -out ~/.ssh/id_rsa -d


以下是我的.travis.yml内容。

	language: node_js
	node_js:
		- '0.12'
		branches:
		  only:
		  - master
		before_install:
			- openssl aes-256-cbc -K $encrypted_xxx_key -iv $encrypted_xxx_iv 
				-in id_rsa.enc -out ~/.ssh/id_rsa -d
			- chmod 600 ~/.ssh/id_rsa
			- eval $(ssh-agent)
			- ssh-add ~/.ssh/id_rsa
			- cp ssh_config ~/.ssh/config
			- git config --global user.name "your-name"
			- git config --global user.email "your-email@com"
		install:
			- npm install hexo-cli -g
			- npm install
			- npm install hexo-generator-feed --save
			- npm install hexo-generator-sitemap --save
			- npm install hexo-deployer-git --save
		script:
			- hexo clean
			- hexo g
			- hexo d

##### 新建gh-pages分支

提交之前还有一步比较重要的步骤，就是需要新建一个gh-pages分支（很重要）
> git branch gh-pages       //新建分支
> 		
> gh-pages的作用是用来发布你的站点通过你的域名/index.html文件就可以直接访问,其中travis是默认将文件解析到该分支下。
		
	//travis的编译结果文件
	To git@github.com:WangXiZhu/zc-blog.git
	118581a...a95474f HEAD -> gh-pages (forced update)

同时你的_config.yml也需要定义branch

  	deploy:
	  type: git
	  repository: git@github.com:githubname/your-repo.git
	  #branch:master //直接注释，不需要指定分支


删除id_rsa文件，切记！！！


##### 提交你的项目(REPO)

> git的一系列操作
> git add 
> git commit
> git push origin master
> 当你的博客push到github上，可以在[travis](https://travis-ci.org/)上看见编译过程

##### 访问你的项目

看看是否成功

