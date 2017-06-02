var gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch')
	sourcemaps = require('gulp-sourcemaps')
	cssnano = require('gulp-cssnano')
	argv = require('yargs').argv
	gulpif = require('gulp-if')
	concat = require('gulp-concat')
	uglify = require('gulp-uglify')
	imagemin = require('gulp-imagemin');

var isProduction = false;
if(argv.prod){
	isProduction = true;
}

var config = {
	scssDir: './assets/scss',
	cssDir: './assets/css',
	jsDir: './assets/js',
	imgDir: './assets/img'
};

gulp.task('style', function(){
	return gulp.src(config.scssDir + '/*.scss')
	.pipe(sourcemaps.init())	
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulpif(isProduction, cssnano(), sourcemaps.write('maps') ))
	.pipe(gulp.dest(config.cssDir));
});

gulp.task('concat', function(){
	return gulp.src([
		config.jsDir + '/start.js',
		config.jsDir + '/main.js',
		config.jsDir + '/end.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest(config.jsDir))
});

gulp.task('compress', ['concat'], function(){
	return gulp.src(config.jsDir + '/scripts.js')
	.pipe(uglify())
	.on('error', console.error.bind(console))
	.pipe(gulp.dest(config.jsDir + '/min'))
});

gulp.task('imagemin', function(){
	return gulp.src([
			config.imgDir + '/*'.png,
			config.imgDir + '/*'.jpg,
			config.imgDir + '/*'.jepg
		])
		.pipe(imagemin())
		.pipe(gulp.dest(config.imgDir + '/'))
})

gulp.task('watch', function(){
	watch(config.scssDir + '/**/*.scss', function(){
		gulp.start('style');
	});
});