'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp'),
    pug = require('gulp-pug'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    csscomb = require('gulp-csscomb'),
    browserSync = require("browser-sync"),
    notify = require('gulp-notify'),
    reload = browserSync.reload;




var path = {
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css',
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


gulp.task('deploy', function () {
    return gulp.src('dist/**/*')
        .pipe(ftp({
            host: '*hostname*',
            user: '*username*',
            pass: '*password*',
            remotePath: '*/path/path*'
        }))
        // you need to have some kind of stream after gulp-ftp to make sure it's flushed
        // this can be a gulp plugin, gulp.dest, or any kind of stream
        // here we use a passthrough stream
        .pipe(gutil.noop());
});




gulp.task('pug:build', function() {
    return gulp.src(path.src.pug)
        .pipe(rigger())
        .on('error', handleError)
        .pipe(pug({
            pretty: true
        }))
        .on('error', handleError)
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({ stream: true }));
})


gulp.task('js:build', function() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .on('error', handleError)
        //.pipe(sourcemaps.init())
        .pipe(uglify())
        .on('error', handleError)
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({ stream: true }));
})



gulp.task('css:build', function() {
    return gulp.src(path.src.css)
        .pipe(rigger())
        .on('error', handleError)
        //.pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleError)
        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false,
            grid: true
        }))
        .pipe(csscomb())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({ stream: true }));
});



function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}



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


gulp.task('watch', ['images:build', 'fonts:build', 'css:build', 'js:build', 'pug:build'], function () {
    gulp.watch(path.watch.css, ['css:build'])
    gulp.watch(path.watch.js, ['js:build'])
    gulp.watch(path.watch.pug, ['pug:build'])
})

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
