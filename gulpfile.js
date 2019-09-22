const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    csscomb = require('gulp-csscomb');

const config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 3030
};

const path = {
    build: {
        js: 'build',
        css: 'build/',
        html: 'build'
    },
    src: {
        js: 'src/**/*.js',
        scss: 'src/**/*.scss',
        html: 'src/**/*.html'
    }

}
gulp.task('html', function() {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({ stream: true }))
});

gulp.task('scss', () => {
    return gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        // .pipe(autoprefixer({ browsers: ['ie 10'] }))
        .pipe(csscomb())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({ stream: true }));
})

gulp.task('script', () => {
    return gulp.src(path.src.js)
        .pipe(babel())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
})

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('watchAll', () => {
    gulp.watch(path.src.scss, gulp.series('scss'));
    gulp.watch(path.src.js, gulp.series('script'));
    gulp.watch(path.src.html, gulp.series('html'));
})

gulp.task('default', gulp.parallel(['watchAll', 'webserver']))