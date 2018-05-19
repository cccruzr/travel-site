var gulp = require('gulp'),
    modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
    return gulp.src(['./travel-app/assets/styles/**/*.css',
                     './travel-app/assets/scripts/**/*.js'])
                .pipe(modernizr({
                    'options': [
                        'setClasses'
                    ]
                }))
                .pipe(gulp.dest('./travel-app/temp/scripts/'));
});
