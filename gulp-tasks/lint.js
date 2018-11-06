

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const sassLint = require('gulp-sass-lint');
const htmlhint = require('gulp-htmlhint');
const config = require('./config');

function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}

function lintScripts(dir, exceptDir) {
  const src = [`${dir}/**/*.js`];
  if (exceptDir) {
    src.push(`!${exceptDir}/**/*.js`);
  }
  gulp.src(src)
    .pipe(eslint({ fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest(`${dir}`)))
    .pipe(eslint.failAfterError())
    .pipe(eslint.results((results) => {
      const count = results.warningCount;
      if (count > 0) {
        throw new gutil.PluginError('gulp-eslint', {
          name: 'ESLintWarning',
          message: `Has ${count} warning${count > 1 ? 's' : ''}`,
        });
      }
    }));
}

gulp.task('lint:codescripts', () => {
  lintScripts(`${config.sourceDir}`, `${config.destDir}`);
});

gulp.task('lint:testscripts', () => {
  lintScripts(`${config.testsDir}`, `${config.testsDir}/coverage`);
});

gulp.task('lint:scripts', ['lint:codescripts', 'lint:testscripts']);

gulp.task('lint:scss', () => gulp.src(`{${config.sourceClientDir},${config.viewsDir}}/**/*.scss`)
  .pipe(sassLint())
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError()));

gulp.task('lint:html', () => gulp.src(`{${config.sourceClientDir},${config.viewsDir}}/**/*.html`)
  .pipe(htmlhint())
  .pipe(htmlhint.failReporter()));

gulp.task('lint', ['lint:scripts', 'lint:scss', 'lint:html']);
