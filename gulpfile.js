'use strict';

// Gulp dependencies.
const gulp = require('gulp');
const del = require('del');

// Typescript dependencies.
const ts = require('gulp-typescript');
const tsconfig = require('./tsconfig.json');

// JS dependencies.
const concat = require('gulp-concat');
const deporder = require('gulp-deporder');
const terser = require('gulp-terser');

// CSS dependencies.
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

// HTML dependencies.
const fileinclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');

// File paths.
const src = './src/';
const build = './build/';

// Build backend typescript.
const _backendTsSrc = [src + '**/*.ts', '!' + src + 'frontend/**/*'];
function _buildBackendTs() {
  return gulp
    .src(_backendTsSrc)
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(gulp.dest(build));
}

// Build frontend typescript.
const _frontendTsSrc = src + 'frontend/ts/**/*.ts';
function _buildFrontendTs() {
  return gulp
    .src(_frontendTsSrc)
    .pipe(
      ts(tsconfig.compilerOptions).on('error', function(error) {
        console.log(error);
      })
    )
    .pipe(
      deporder().on('error', function(error) {
        console.log(error);
      })
    )
    .pipe(concat('scripts.js'))
    .pipe(terser())
    .pipe(gulp.dest(build + 'frontend'));
}

// Build SCSS.
const _scssSrc = src + 'frontend/scss/**/*.scss';
function _buildScss() {
  return gulp
    .src(src + 'frontend/scss/styles.scss')
    .pipe(
      sass({
        outputStyle: 'nested',
        imagePath: '/images/',
        precision: 3,
        errLogToConsole: true
      }).on('error', sass.logError)
    )
    .pipe(postcss([cssnano]))
    .pipe(gulp.dest(build + 'frontend'));
}

// Build HTML files.
const _htmlSrc = src + 'frontend/**/*.html';
function _buildHtml() {
  return gulp
    .src(_htmlSrc)
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(htmlclean())
    .pipe(gulp.dest(build + 'frontend'));
}

// Copy over the word data.
const _dataSrc = src + 'data/*';
function _copyData() {
  return gulp.src(_dataSrc).pipe(gulp.dest(build + 'data'));
}

// Copy over sounds.
const _soundsSrc = src + 'frontend/sounds/*';
function _copySounds() {
  return gulp.src(_soundsSrc).pipe(gulp.dest(build + 'frontend/sounds'));
}

// Clean build folder.
exports.clean = function(done) {
  del.sync(build + '**');
  done();
};

// Watch for file changes.
exports.watch = function(done) {
  gulp.watch(_backendTsSrc, _buildBackendTs);
  gulp.watch(_frontendTsSrc, _buildFrontendTs);
  gulp.watch(_scssSrc, _buildScss);
  gulp.watch(_dataSrc, _copyData);
  gulp.watch(_htmlSrc, _buildHtml);
  done();
};

// Build everything.
exports.build = gulp.parallel(
  _buildBackendTs,
  _buildFrontendTs,
  _buildScss,
  _buildHtml,
  _copyData,
  _copySounds
);
