'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    imports     = require('gulp-imports'),
    gutil       = require('gulp-util'),
    ftp         = require('gulp-ftp'),
    criticalCss = require('gulp-critical-css'),
    pug         = require('gulp-pug'),
    cssmin      = require('gulp-minify-css'),
    rimraf      = require('rimraf'),
    csscomb     = require('gulp-csscomb'),
    browserSync = require('browser-sync'),
    media_group = require('gulp-group-css-media-queries'),
    rename      = require('gulp-rename'),
    plumber     = require('gulp-plumber'),
    prettyHtml  = require('gulp-pretty-html'),
    reload      = browserSync.reload;




var path = {
    dist: {
        html:   'dist/',
        js:     'dist/js/',
        css:    'dist/css/',
        img:    'dist/images/',
        fonts:  'dist/fonts/'
    },
    src: {
        pug:    'src/pug/*.pug',
        css:    'src/css/main.scss',
        js:     'src/js/main.js',
        img:    'src/images/**/*.*',
        fonts:  'src/fonts/**/*.*'
    },
    watch: {
        js:     'src/**/*.js',
        pug:    'src/**/*.pug',
        css:    'src/**/*.scss',
        img:    'src/img/**/*.*',
        fonts:  'src/fonts/**/*.*'
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
            host:       '*hostname*',
            user:       '*username*',
            pass:       '*password*',
            remotePath: '*/path/path*'
        }))
        .pipe(gutil.noop());
});


gulp.task('pug:build', function() {
    return gulp.src(path.src.pug)
        .pipe(pug({
            pretty: true
        }))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(plumber())    
        .pipe(prettyHtml({
            indent_size: 4,
            indent_char: ' ',
            unformatted: ['code', 'pre', 'em', 'strong', 'i', 'b', 'br']
        }))
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({ stream: true }));
})


gulp.task('js:build', function() {
    return gulp.src(path.src.js)
        .pipe(imports())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(path.dist.js))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({ stream: true }));
})


gulp.task('css:build', function() {
    return gulp.src(path.src.css)
        .pipe(sass())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false,
            grid: true
        }))
        .pipe(csscomb())
        .pipe(media_group())
        .pipe(gulp.dest(path.dist.css))
        .pipe(criticalCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(plumber())
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


gulp.task('watch', ['images:build', 'fonts:build', 'css:build','js:build', 'pug:build'], function () {
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
