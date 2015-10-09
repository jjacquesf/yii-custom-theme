var gulp = require('gulp'),
	phpJade = require('gulp-jade-for-php'),
	stylus = require('gulp-stylus')
	concat = require('gulp-concat'),
	webserver = require('gulp-webserver'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css'),
  dirSync = require('gulp-directory-sync'),
  uglify = require('gulp-uglify');

gulp.task('css', function () {
    gulp.src('lib/styl/style.styl')
        .pipe(stylus({compress: true, paths: ['lib/styl']}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./css'));
});

gulp.task('html', function() {
  gulp.src(['lib/views/*.jade', 'lib/views/**/*.jade'])
    .pipe(phpJade({ pretty: true }))
    .pipe(gulp.dest('./views'))
});

gulp.task('img', function() {  
  gulp.src( '' )
    .pipe(dirSync('lib/img', './img'));
});

gulp.task('js', function(){
    return gulp.src(['lib/js/*'])
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});


gulp.task('watch', function () {
   gulp.watch(['lib/styl/*.styl', 'lib/styl/*/*.css'], ['css']);
   gulp.watch(['lib/jade/*.jade', 'lib/jade/**/*.jade'], ['html']);
   gulp.watch(['lib/img/*'], ['img']);
   gulp.watch(['lib/js/*.js'], ['js']);
   
});

gulp.task('default', ['css', 'html', 'img', 'js', 'watch']);
