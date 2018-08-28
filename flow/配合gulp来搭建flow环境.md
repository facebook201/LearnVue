#### gulp搭建工作流

因为flow浏览器不认识 所以我们要安装 gulp-babel gulp-babel@next @babel/core

```javascript
// 

const gulp = require('gulp');
const babel = require('gulp-bable');

gulp.task('default', function(){
   return gulp.src('**./*.js')
    	.pipe(babel())
    	.pipe(gulp.dest('dist'));
});
```

package.json

```javascript
{
  "dependencies": {
    "babel-core": "^6.26.3",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-flow": "^6.23.0",
    "gulp": "^3.9.1"
  },
  "devDependencies": {
    "babel-preset-es2015": "^6.24.1",
    "gulp-babel": "^7.0.1"
  }
}

```

 根据上面的配置可以解析flow检测 

 还可以在目录下面配置 flowconfig  目录如下

>.babelrc
>
>.flowconfig
>
>gulpfile.js
>
>src // babel 转换之后的js 可以被浏览器识别
>
>lib // flow检测的js文件