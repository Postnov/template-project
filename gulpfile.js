'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    pug = require('gulp-pug'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    csscomb = require('gulp-csscomb'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;




var path = {
    dist: {
        html: 'dist/',
        js: 'dist/jss/',
        css: 'dist/',
        img: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    src: {
        pug: 'src/pug/*.pug',
        css: 'src/css/main.scss',
        js: 'src/js/main.js',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        js: 'src/**/*.js',
        pug: 'src/**/*.pug',
        css: 'src/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};



var config = {
    server: {
        baseDir: './dist'
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: 'Postnov.Frontend'
};



gulp.task('pug:build', function() {
    gulp.src(path.src.pug)
        .pipe(rigger())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({ stream: true }));
})


gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({ stream: true }));
})



gulp.task('css:build', function() {
    gulp.src(path.src.css)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(csscomb())
        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false,
            grid: true
        }))
        .pipe(csscomb())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({ stream: true }));
});



gulp.task('images:build', function() {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
});




gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});


gulp.task('build', [
    'pug:build',
    'css:build',
    'js:build',
    'images:build',
    'fonts:build',
])


gulp.task('watch', function() {
    watch([path.watch.pug], function(event, cb) {
        gulp.start('pug:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('images:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);