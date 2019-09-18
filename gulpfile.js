const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    scss = require('gulp-sass'),
    browserSync = require("browser-sync"),
    browserify = require('gulp-browserify'),
    reload = browserSync.reload;

    const config = {
        server: {
            baseDir: "./build"
        },
        tunnel: false,
        host: 'localhost',
        port: 8080,
        logPrefix: "ab"
    };

    const path = {
        build: {
            js: 'build',
            css: 'build',
            html: 'build/**/*.html'
        },
        src:{
            js: 'src/**/*.js',
            scss: 'src/**/*.scss',
        }

      }
      gulp.task('html', function () {
       return gulp.src(path.build.html)
          .pipe(reload({stream: true}));
    });

      gulp.task('scss', () => {
        return gulp.src(path.src.scss)
          .pipe(scss())
          .pipe(autoprefixer({ browsers: ['ie 10'] }))
          .pipe(gulp.dest(path.build.css))
          .pipe(reload({stream: true}));
      })

      gulp.task('script', () => {
        return gulp.src(path.src.js)
          .pipe(babel())
          .pipe(browserify({
            debug: false
          }))
          .pipe(gulp.dest(path.build.js))
          .pipe(reload({stream: true}));
      })

      gulp.task('webserver', function () {
        browserSync(config);
        });

      gulp.task('watchAll', () => {
        gulp.watch(path.src.scss, gulp.series('scss'));
        gulp.watch(path.src.js, gulp.series('script'));
        gulp.watch(path.build.html, gulp.series('html'));
      })

      gulp.task('default', gulp.parallel(['watchAll', 'webserver']))