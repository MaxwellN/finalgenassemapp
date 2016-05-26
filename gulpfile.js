"use-strict";

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var watch = require('gulp-watch');


var config = {
  port: 5000,
  baseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/scripts/*.js',
    sass: './src/styles/*.scss',
    dist: './dist'
  }
};

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
    .pipe(open({ uri:config.baseUrl + ':' + config.port + '/'}));
});

gulp.task('js', function(){
  return gulp.src(config.paths.js)
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('html', function(){
  return gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('sass', function(){
  return gulp.src(config.paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(config.paths.dist + '/styles'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.baseUrl,
    livereload: true
  })
});





gulp.task('watch', function(){
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.sass, ['sass']);
  gulp.watch(config.paths.html, ['html']);
})


gulp.task('default', ['open', 'watch']);
