/* File: gulpfile.js */

// Grab our gulp packages
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	// Automatically write browsers css prefixes, i.e. -webkit-linear-gradient, instead of using bourbon
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	// Compressed images
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	cache = require('gulp-cache'),
	// Setting up the local server with connect
	connect = require('gulp-connect'),
	// Reloading when any files are changed in app
	livereload = require('gulp-livereload'),
	del = require('del');

// Define the default task and pass the watch function into it, so when gulp is running, watch task is being run
gulp.task('default', ['watch', 'webserver']);

// Setting up localhost:8080
gulp.task('webserver', function() {
	connect.server();
});

// Configure the sass compilation task
gulp.task('build-css', function() {
	return gulp.src('app/assets/scss/**/*.scss')
		.pipe(autoprefixer('last 2 version'))
		.pipe(sass())
		.pipe(gulp.dest('app/assets/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('app/assets/css'));
});

// Configure JS lint, concat and minify
gulp.task('build-js', function() {
	// ignoring any test files !app/views/**/*_test.js
	return gulp.src(['app/views/**/*.js', '!app/views/**/*_test.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('app/assets/js'))
		.pipe(rename({suffix: '.min'}))
		// only uglify if gulp is ran with '--type production'
		.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
		.pipe(gulp.dest('app/assets/js'));
});

// Setting up image compresion
gulp.task('images', function() {
	return gulp.src('app/images/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('app/assets/images'));
});

// Clean out destination folders and rebuild css, js and image
gulp.task('clean', function(cb) {
	del(['app/assets/css', 'app/assets/js', 'app/assets/images'], cb)
});

// Configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	livereload.listen();

	// Automatically refresh the page when any files in app is changed
	gulp.watch('app/assets/**').on('change', livereload.changed);
	
	gulp.watch('app/scss/**/*.scss', ['build-css']);
	gulp.watch('app/views/**/*.js', ['build-js']);
	gulp.watch('app/images/**/*', ['images']);
});