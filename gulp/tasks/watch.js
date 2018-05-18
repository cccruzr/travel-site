var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('cssInject', ['styles'], function() { //'styles' is a dependency of cssInject
    return gulp.src('./travel-app/temp/styles/styles.css')
               .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "travel-app"
    }
  });

  watch('./travel-app/index.html', function() {
    browserSync.reload();
  });

  watch('./travel-app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

  watch('./travel-app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});