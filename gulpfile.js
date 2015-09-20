"use strict";

var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var fs = require('fs');
var inlineCss = require('gulp-inline-css');
var data = require('gulp-data');
var rename = require('gulp-rename');
var beep = require('beepbeep');
var replace = require('gulp-replace');

var config = {
	constants: require('./src/constants/index.js')
}

var onError = function(err) {
	beep();
	gutil.log(err);
}

gulp.task('email', function() {
	var constants = require('./src/constants/index.js')();

	gulp.src('./src/templates/*.jade')
		.pipe(jade({
			data: constants,
			pretty: true
		}).on('error', onError))
    	.pipe(inlineCss({
			removeStyleTags: false
		}))
		.pipe(gulp.dest('./dist'));
})

gulp.task('watch', function() {
    gulp.watch('./src/templates/**/*.jade', ['email']);
    gulp.watch('./src/styles/**/*.css', ['email']);
    gulp.watch('./src/constants/**/*.js', ['email']);
});

gulp.task('dist', ['email'])
gulp.task('default', ['email', 'watch'])
