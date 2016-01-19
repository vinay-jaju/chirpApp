var gulp= require('gulp');
var autoprefixer= require('gulp-autoprefixer');
var sass= require('gulp-sass');
var minify= require('gulp-minify-css');


gulp.task('css',()=> {
	return gulp.src('./not_public/scss/*.scss')
				.pipe(sass())
				.pipe(autoprefixer())
				.pipe(minify())
				.pipe(gulp.dest('./public/css'));
});


gulp.task('watch_styles', ['css'], ()=> {
	gulp.watch('./not_public/scss/**/*.scss',['css']);
});