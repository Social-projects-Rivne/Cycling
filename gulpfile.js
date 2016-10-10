var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');

var path = {
  HTML: 'APP/templates/APP/index.html',
  ALL: ['static/ts/*.js', 'static/ts/**/*.js', 'static/ts/*.jsx', 'static/ts/**/*.jsx'],
  JS: ['static/ts/*.js', 'static/ts/**/*.js', 'static/ts/*.jsx', 'static/ts/**/*.jsx'],
  MINIFIED_OUT: 'build.min.js',
  DEST_BUILD: 'static/js/app',
};

gulp.task('build', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(uglify(path.MINIFIED_OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', function(){
  gulp.watch(path.ALL, ['build']);
});

gulp.task('default', ['watch']);
