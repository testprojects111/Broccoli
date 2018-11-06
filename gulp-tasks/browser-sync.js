'use strict';

const browserSync = require('browser-sync').create();
const gulp = require('gulp');

gulp.task('browser-sync', ['watch'], () => {
  browserSync.init({
    reloadDelay: 500,
    port: 8081,
    socket: {
      domain: 'localhost:8081',
    }
  });
});

gulp.task('bs-delay', () => {
  setTimeout(() => {
    browserSync.reload({ stream: false });
  }, 1000);
});

gulp.task('watch', ['build'], () => {
  gulp.watch('./src/client/**/*.scss', ['build:styles']);
  gulp.watch(['./src/client/**/*', '!./src/client/**/*.scss'], ['build', 'bs-delay']);
});

module.exports = browserSync;
