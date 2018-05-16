const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');


gulp.task('default', ['css','images','js']);


gulp.task('css', () =>
    gulp.src('./src/css/**/*')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/css/'))
);

gulp.task('images', () =>{
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('js', function() {
    gulp.src(['./src/js/resources.js','./src/js/app.js','./src/js/engine.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});