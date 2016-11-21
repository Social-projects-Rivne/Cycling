var gulp         = require('gulp');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var webpack      = require('webpack-stream');
var less         = require('gulp-less');
/*var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');*/

var path = {
  HTML: 'APP/templates/APP/index.html',
  JSX: ['static/jsx/*.jsx', 'static/jsx/**/*.jsx'],
  MINIFIED_OUT: 'bundle.js',
  DEST_BUILD: 'static/js/app',
  LESS: 'static/less/*.less',
  MainLESS: 'static/less/main.less',
  CSS: 'static/css',
  CSSFiles: 'static/css/*.css'
};

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

// Compiles LESS > CSS 
gulp.task('less', function(){
    return gulp.src(path.MainLESS)
        .pipe(less())
        .on('error', swallowError)
        .pipe(gulp.dest(path.CSS));
});

gulp.task('transform', function() {
  return gulp.src(path.JSX)
    .pipe(webpack( require('./webpack.config.js') ))
    .on('error', swallowError)
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('build', function(){
  return gulp.src(path.JSX)
    .pipe(webpack( require('./webpack.config.js') ))
    .on('error', swallowError)
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(uglify(path.MINIFIED_OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});

/*gulp.task('autoprefixer', function () {
    return gulp.src(path.CSSFiles)
        .pipe(postcss([ autoprefixer({ browsers: ['last 6 versions'] }) ]))
        .pipe(gulp.dest('static/css/prefmain.css'));
});*/

gulp.task('watch', function(){
  gulp.watch(path.JSX, ['transform']);
  gulp.watch(path.LESS, ['less']);
  /*gulp.watch(path.CSS, ['autoprefixer']);*/
});

gulp.task('default', ['less', 'transform', 'watch']);
