var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		jade         = require('gulp-jade'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'jade'], function() {
		browserSync.init({
				server: {
						baseDir: "./app/_zaglushka"
				},
				notify: false
		});
		
});

// gulp.task('styles', function () {
// 	return gulp.src('sass/*.sass')
// 	.pipe(sass({
// 		includePaths: require('node-bourbon').includePaths
// 	}).on('error', sass.logError))
// 	.pipe(rename({suffix: '.min', prefix : ''}))
// 	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
// 	.pipe(minifycss())
// 	.pipe(gulp.dest('app/css'))
// 	.pipe(browserSync.stream());
// });

// gulp.task('jade', function() {
// 	return gulp.src('jade/*.jade')
// 	.pipe(jade({pretty:true}))
// 	.pipe(gulp.dest('app'));
// });

gulp.task('styles', function () {
	return gulp.src('sass/_zaglushka/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss())
	.pipe(gulp.dest('app/_zaglushka/css'))
	.pipe(browserSync.stream());
});

gulp.task('jade', function() {
	return gulp.src('jade/_zaglushka/*.jade')
	.pipe(jade({pretty:true}))
	.pipe(gulp.dest('app/_zaglushka'));
});

// gulp.task('scripts', function() {
// 	return gulp.src([
// 		'./app/libs/jquery/jquery-1.11.2.min.js'

// 		])
// 		.pipe(concat('libs.js'))
// 		// .pipe(uglify()) //Minify libs.js
// 		.pipe(gulp.dest('./app/_zaglushka/js/'));
// });

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('jade/*.jade', ['jade']);
	gulp.watch('sass/_zaglushka/*.sass', ['styles']);
	gulp.watch('jade/_zaglushka/*.jade', ['jade']);
	// gulp.watch('app/_zaglushka/libs/**/*.js', ['scripts']);
	gulp.watch('app/_zaglushka/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);

	gulp.watch('app/_zaglushka/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
