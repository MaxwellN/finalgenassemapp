"use-strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

var config = {
  paths: {
    html: './src/*.html',
    js: './src/scripts/*.js',
    sass: './src/styles/*.scss',
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

gulp.task('sass', function(){
  return gulp.src(config.paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dist + '/styles'))
})



gulp.task('watch', function(){
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.sass, ['sass']);
  gulp.watch(config.paths.html, ['html']);
})


gulp.task('default', ['watch']);
