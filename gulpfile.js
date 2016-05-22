"use-strict";

var gulp = require('gulp');

var config = {
  paths: {
    html: './src/*.html',
    js: './src/scripts/*.js',
    dist: './dist'
  }
};

gulp.task('js', function(){
  return gulp.src(config.paths.js)
    .pipe(gulp.dest(config.paths.dist + '/scripts'));
});

gulp.task('html', function(){
  return gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('default', ['js', 'html']);
