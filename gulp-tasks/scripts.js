const gulp = require('gulp');
const util = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const notify = require('gulp-notify');

const config = require('./_config');

/**
 * build scripts
 * sourcemaps only for dev env
 * transpaling es6 to es5 (for old browser)
 * minification scripts only for prod env
 */
const scripts = (cb) => {
  gulp.src([
      `./src/js/**/*.js`,
      `!./src/js/**/_*.js`,
      `!./src/js/libs/**/*.*`
    ])
    .pipe(config.production ? util.noop() : sourcemaps.init({
      loadMaps: true
    }))
    .pipe(browserify({
      insertGlobals: false,
      debug: !config.production
    }))
    .on('error', notify.onError())
    .pipe(config.production ? util.noop() : sourcemaps.write())
    .pipe(config.production ? uglify() : util.noop())
    .pipe(gulp.dest(`./dest/js/`));
  cb();
}
/**
 * Copy js files without changes from `src` to `dest`.
 * It is useful for libs like `jQuery`, `slick-slider` or etc.
 */
const jsLibs = (cb) => {
  gulp.src(`./src/js/libs/**/*.js`)
    .pipe(gulp.dest(`./dest/js/libs/`));
  cb();
}

const watcher = (cb) => {
  console.log(`watch js in './src/js/**/*.js'`);
  gulp.watch(`./src/js/**/*.js`, scripts);
  cb();
};

const jsWatcher = gulp.series(scripts, jsLibs, watcher);

module.exports = {
  scripts,
  jsWatcher,
  jsLibs
};
