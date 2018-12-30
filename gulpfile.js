const gulp = require('gulp');
const connect = require('gulp-connect');

const htmlTask = require('./gulp-tasks/html');
const stylesTask = require('./gulp-tasks/styles');
const jsTask = require('./gulp-tasks/scripts');
const favicons = require('./gulp-tasks/images');

gulp.task('html', () => {
  console.log(`build html`);
  return htmlTask.html();
});

gulp.task('css', () => {
  console.log(`build css`);
  return stylesTask.styles();
});

gulp.task('js', () => {
  console.log(`build js`);
  jsTask.jsLibs();
  return jsTask.scripts();
});

gulp.task('images', () => {
  console.log(`build images`);
  return favicons();
});

gulp.task('server', () => {
  connect.server({
    root: `./dest/`,
    livereload: false
  });
});

gulp.task('watch', () => {
  htmlTask.htmlWatcher();
  stylesTask.cssWatcher();
  jsTask.jsWatcher();
  imagesTask.imagesWatcher();
  gulp.task('server')();
});

gulp.task('copy', () => {
  return gulp.src('./src/copyInRoot/**/*')
    .pipe(gulp.dest('./dest/'));
});

gulp.task('build', (cb) => {
  gulp.task('html')();
  gulp.task('css')();
  gulp.task('js')();
  gulp.task('images')();
  gulp.task('copy')();

  cb();
});
