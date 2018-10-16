const gulp = require('gulp');
const connect = require('gulp-connect');

const htmlTask = require('./gulp-tasks/html');
const stylesTask = require('./gulp-tasks/styles');
const jsTask = require('./gulp-tasks/scripts');
const imagesTask = require('./gulp-tasks/images');

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
  imagesTask.favicons();
  return imagesTask.images();
});

gulp.task('server', () => {
  connect.server({
    root: `./dest/`,
    livereload: false
  });
});

gulp.task('watch', (cb) => {
  htmlTask.htmlWatcher();
  stylesTask.cssWatcher();
  jsTask.jsWatcher();
  imagesTask.imagesWatcher();
  gulp.task('server')();
  cb();
});

gulp.task('build', (cb) => {
  gulp.task('html')();
  gulp.task('css')();
  gulp.task('js')();
  gulp.task('images')();

  cb();
});
