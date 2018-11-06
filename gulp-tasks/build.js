'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const webpack = require('webpack');
const runSequence = require('run-sequence');
const browserSync = require('./browser-sync');
const config = require('./config');

gulp.task('clean:dist', () => {
  del.sync([
    `${config.destDir}`,
  ]);
});

gulp.task('copy-locales', () => {
  gulp.src(`${config.sourceClientDir}/locales/**/*.json`)
    .pipe(gulp.dest(`${config.destDir}/locales`));
});

gulp.task('build:styles', () => {
  const options = config.cloptions;
  return gulp.src(`${config.cssSrcDir}/app.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: options.debug ? 'expanded' : 'compressed',
    }).on('error', sass.logError))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(rename((filePath) => {
      if (filePath.basename === 'styles') {
        filePath.basename = 'app';
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${config.destDir}/css`))
    .pipe(browserSync.stream());
});

gulp.task('build:webpack', () => {
  const options = config.cloptions;
  let webpackConfig = require('../webpack.prod');
  if (options.debug) {
    webpackConfig = require('../webpack.dev');
  }
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(new gutil.PluginError('webpack', err));
      } else {
        gutil.log('[webpack]', stats.toString(options.verbose ? {
          colors: true,
        } : 'errors-only'));
        resolve();
      }
    });
  });
});

gulp.task('build', ['clean:dist', 'copy-locales', 'build:styles'],
  () => runSequence('build:webpack'));
