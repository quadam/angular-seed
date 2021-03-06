'use strict';

var gulp = require('gulp');
var processhtml = require('gulp-processhtml');
var concat = require('gulp-concat');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var insert = require('gulp-insert');

var moduleName = 'myApp';

gulp.task('processhtml', function() {
	return gulp.src('app/index.html')
		.pipe(processhtml())
		.pipe(gulp.dest('dist'));
});

gulp.task('concatDeps', function() {
	return gulp.src([
			'./app/bower_components/angular/angular.min.js',
			'./app/bower_components/angular-route/angular-route.min.js'
		])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('concatCSS', function() {
	return gulp.src([
			'./app/bower_components/html5-boilerplate/dist/css/normalize.css',
			'./app/bower_components/html5-boilerplate/dist/css/main.css',
			'./app/app.css'
		])
		.pipe(concat('styles.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('moveModernizr', function() {
	return gulp.src([
			'./app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js'
		])
		.pipe(concat('modernizr.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('concatApp', ['templates'], function() {
	return gulp.src([
			'./app/app.js',
			'./app/views/**/!(*_test).js',
			'./app/components/**/!(*_test).js',
			'./dist/templates.js'
		])
		.pipe(concat('app.js'))
		.pipe(insert.append(
			'angular.module(\'' + moduleName +
			'\').config(function ($compileProvider) {' +
			'$compileProvider.debugInfoEnabled(false);' +
			'});'))
		.pipe(ngAnnotate())
		//.pipe(uglify())
		.pipe(gulp.dest('./dist/'));
});

gulp.task('templates', function() {
	return gulp.src([
			'./app/view*/**/*.html'
		])
		.pipe(templateCache({
			module: moduleName
		}))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('clean:templates', ['concatApp', 'templates'], function() {
	return del('./dist/templates.js');
});

gulp.task('default', ['processhtml', 'templates', 'concatApp',
	'concatDeps', 'concatCSS', 'moveModernizr', 'clean:templates'
]);
