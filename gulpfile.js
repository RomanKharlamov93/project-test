var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
                stream: true
            })
        );

});

gulp.task('pug', function(){
    return gulp.src('app/pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .on('end' , browserSync.reload);
})

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        notify: false
    });
    browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function(){
    gulp.watch('app/sass/**/*.sass', gulp.series('sass'),
    gulp.watch('app/pug/**/*.pug', gulp.series('pug')))
})

gulp.task('default', gulp.series(
    gulp.parallel('sass', 'pug'),
    gulp.parallel('watch', 'serve')
));