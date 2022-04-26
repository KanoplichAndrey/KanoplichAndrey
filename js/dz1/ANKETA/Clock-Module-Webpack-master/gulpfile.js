var gulp = require('gulp'),
    minify = require('gulp-minifier'),
    htmlhint = require("gulp-htmlhint"),
    browserSync = require('browser-sync');

gulp.task('pack', function() {
  return gulp.src('www/src/**/*')
    .pipe(minify({
      minify: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('www/release'));
});

gulp.task('html-lint', function() {
  return gulp.src('www/src/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter());
});

gulp.task('watch', function () {
  browserSync({
    proxy: 'localhost:3000',
    files: ['www/**/*.{js,css,html}']
  });
});
