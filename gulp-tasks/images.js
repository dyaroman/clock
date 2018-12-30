const gulp = require('gulp');

const favicons = () => gulp.src(`./src/images/favicons/*.*`)
  .pipe(gulp.dest(`./dest/images/favicons/`));

module.exports = favicons;
