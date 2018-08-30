const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function(){
  return gulp.src('./lib/*.js')
      .pipe(babel())
      .pipe(gulp.dest('src'));
});

gulp.task('watch', function(){
  console.log('文件改变了');
  return gulp.src('./lib/*.js')
      .pipe(babel())
      .pipe(gulp.dest('src'));
});
