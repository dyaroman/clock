const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const util = require('gulp-util');

const config = require('./_config');

const images = (cb) => {
  gulp.src([
      `./src/images/**/*.{svg,gif,png,jpg,jpeg}`,
      `!./src/images/favicons/*.*`
    ])
    .pipe(config.production ? imagemin({
      progressive: true,
      optimizationLevel: 5,
      verbose: false
    }) : util.noop())
    .pipe(gulp.dest(`./dest/images/`));
  cb();
}

const watcher = (cb) => {
  console.log(`watch images in './src/images/'`);
  gulp.watch(`./src/images/**/*.{svg,gif,png,jpg,jpeg}`, images);
  cb();
};

const favicons = (cb) => {
  gulp.src(`./src/images/favicons/*.*`)
    .pipe(gulp.dest(`./dest/images/favicons/`));
  cb();
}

const imagesWatcher = gulp.series(images, favicons, watcher);

module.exports = {
  images,
  imagesWatcher,
  favicons
};
