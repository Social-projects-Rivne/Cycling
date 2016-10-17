var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

var path = {
  HTML: 'APP/templates/APP/index.html',
  ALL: ['static/jsx/*.js', 'static/jsx/**/*.js', 'static/jsx/*.jsx', 'static/jsx/**/*.jsx'],
  JS: ['static/jsx/*.js', 'static/jsx/**/*.js', 'static/jsx/*.jsx', 'static/jsx/**/*.jsx'],
  MINIFIED_OUT: 'build.min.js',
  DEST_BUILD: 'static/js/app',
};

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

gulp.task('transform', function() {
  return gulp.src(path.JS)
    .pipe(webpack( require('./webpack.config.js') ))
    .on('error', swallowError)
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform']);
});

gulp.task('default', ['watch']);
