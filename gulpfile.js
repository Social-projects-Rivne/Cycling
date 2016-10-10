var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

var path = {
  HTML: 'APP/templates/APP/index.html',
  ALL: ['static/ts/*.js', 'static/ts/**/*.js', 'static/ts/*.jsx', 'static/ts/**/*.jsx'],
  JS: ['static/ts/*.js', 'static/ts/**/*.js', 'static/ts/*.jsx', 'static/ts/**/*.jsx'],
  MINIFIED_OUT: 'build.min.js',
  DEST_BUILD: 'static/js/app',
};

gulp.task('transform', function() {
  return gulp.src(path.JS)
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform']);
});

gulp.task('default', ['watch']);
