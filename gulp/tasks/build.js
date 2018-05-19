var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify-es').default,
    gutil = require('gulp-util'),
    browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
          baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', ['icons'], function() {
    return del("./docs");
});

gulp.task('copyGeneralFiles', ["deleteDistFolder"], function() {
    var pathsToCopy = [
        "./travel-app/**/*",
        "!./travel-app/index.html",
        "!./travel-app/assets/images/**",
        "!./travel-app/assets/styles/**",
        "!./travel-app/assets/scripts/**",
        "!./travel-app/temp",
        "!./travel-app/temp/**"
    ];

    return gulp.src(pathsToCopy)
                .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
    return gulp.src(["./travel-app/assets/images/**/*",
                "!./travel-app/assets/images/icons",
                "!./travel-app/assets/images/icons/**/*",
            ])
                .pipe(imagemin({
                    progressive: true,
                    interlaced: true,
                    multipass: true
                }))
                .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src("./travel-app/index.html")
                .pipe(usemin({
                    css: [  function() {return rev()}, 
                            function() {return cssnano()}
                         ],
                    js: [   function() {return uglify().on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })}, 
                                function() {return rev()}
                        ]
                }))
                
                .pipe(gulp.dest("./docs"))
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);