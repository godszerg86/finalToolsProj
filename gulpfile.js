const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const htmlreplace = require('gulp-html-replace');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('default', ['css', 'images', 'js']);


gulp.task('css', () =>
    gulp.src('./src/css/**/*')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({
        compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./dist/css/'))
);

gulp.task('images', () => {
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('js', () => {
    pump([
        gulp.src(['./src/js/resources.js', './src/js/app.js', './src/js/engine.js']),
        babel({
            presets: ['env']
        }),
        concat('main.js'),
        uglify(),
        gulp.dest('./dist/js/')
    ]);
});


/* decided to try html replace plug-in
it replace this three lines:
  <script src="js/resources.js"></script>
    <script src="js/app.js"></script>
    <script src="js/engine.js"></script>
    with:
    <script src="js/main.js"></script>
    and copy index.html to dist/ folder
*/
gulp.task('html', () => {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'js': 'js/main.js'
        }))
        .pipe(gulp.dest('dist/'));

});

gulp.task('cssMin', () => {
    gulp.src('./src/css/**/*')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dist/css/'))
});

gulp.task('watchCss', () => {
    gulp.watch('./src/css/style.css', ['cssMin'])
});