**设置自己的git信息**

git config —global user.name 'syo'

git config —global user.email 'syolmm@qq.com'



代码提交错误 如果要回退  先找到版本号**

git log

git reset —hard 版本号

git push -f -u origin master



**新建分支**

git clone url // 拷贝远程master

git checkout -b branchName 新建分支名

git checkout -b name origin/xxxname 切换到远程 并拉下代码 新建一个分支



**删除本地分支 要到别的分支去删除**

例如我们可以在master 分支

git checkout  matser

git branch -D 分支名

git branch -D 分支1 分支2 分支3  **批量删除本地分支**



**删除远程分支**

git push origin --delete branchname

git push origin -d branchName

git push origin -d syo1 syo2 syo3    **批量删除远程分支**



**怎么合并别人远程的代码到我的分支上 。保持我们两个代码同步**

现在双方的代码都提交到远程分支 我要合并双方的分支代码 解决冲突、保证代码的同步。

* 第一步切换到别人的分支（本地分支）

  git checkout syo

* 第二步 在本地分支拉去远程分支的代码

  git pull origin syo

* 第三步 在别人的分支合并自己的远程分支 （有冲突解决冲突）

  git merge origin/syolmm

* 第四步 提交你刚刚合并的 到别人的远程分支（这样别人的分支和你的分支就合并好了）

  git push origin syo

* 第五步切换到自己的本地分支

  git checkout syolmm

* 第六步 合并远程别人的分支 

  git merge origin/syo

* 最后提交自己的本地代码到远程

  git push origin syolmm

  ​


### Global 全局设置

* 设置别名 -alias。通过别名可以简化输入的内容，别名的配置也可以在gitconfig 里面查看。

  git  config  —global alias.cm commit

  这样可以使用 git cm -m 'xx' 来提交修改内容



### Git 基础命令

* git diff 如果修改了某个文件 查看目前修改了哪些 可以使用

* git rm fileName  删除文件



* git reset 不小心添加了某些文件 使用取消某些add的文件



### 分支branch 

* git branch -a 查看所有分支
* git checkout -b [name] 新建分支
* git  chekout [name] 切换分支
* git branch -d [name] 删除分支 


* git checkout branch 对比分区区别

  ​

### remote 

* 添加远程地址 git remote add origin [address]
* 建立本地分支和远程的联系 首先我们可以 git banch -vv 查看本地和远程的关联关系。
  如果没有关联关系  git branch --set-upstream-to=origin/bugfix 关联起远程分支的名字
   
* 分支推送到远程分支 git push origin syo 

