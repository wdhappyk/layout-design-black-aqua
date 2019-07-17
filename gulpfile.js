const gulp = require('gulp');

const webserver = require('gulp-webserver');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');


gulp.task('default', ['webserver', 'scss:watch']);

gulp.task('webserver', function () {
    gulp.src(['./', '!./scss/**/*.scss', '!./view/**/*.pug'])
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('scss', function () {
    return gulp.src(['!./scss/bootstrap/**/*.scss', './scss/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('scss:watch', ['scss'], function () {
    gulp.watch('./scss/**/*.scss', ['scss']);
});