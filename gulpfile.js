var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require("gulp-babel");

gulp.task('sass', function () {
   return gulp.src('src/sass/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('build'))
});

// gulp.task("js", function () {
//   return gulp.src("src/*.js")
//     .pipe(babel())
//     .pipe(gulp.dest("build"));
// });

gulp.task('watch', function () {
   gulp.watch('src/sass/*.scss', gulp.series('sass'));
   // gulp.watch('src/*.js', gulp.series('js'));
});

