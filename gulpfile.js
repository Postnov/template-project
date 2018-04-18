'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    prefixer    = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-sass'),
    gutil       = require('gulp-util'),
    ftp         = require('gulp-ftp'),
    pug         = require('gulp-pug'),
    cssmin      = require('gulp-minify-css'),
    rimraf      = require('rimraf'),
    csscomb     = require('gulp-csscomb'),
    browserSync = require('browser-sync'),
    media_group = require('gulp-group-css-media-queries'),
    rename      = require('gulp-rename'),
    htmlbeauty  = require('gulp-html-beautify'),
    criticalCss = require('gulp-critical-css'),
    replace     = require('gulp-replace'),
    flatten     = require('gulp-flatten'),
    imports     = require('gulp-imports'),
    plumber     = require('gulp-plumber'),
    reload      = browserSync.reload;




var path = {
    dist: {
        html:   'dist/',
        js:     'dist/js/',
        css:    'dist/css/',
        img:    'dist/images/',
        fonts:  'dist/fonts/',
        blocks: 'dist/'
    },
    src: {
        pug:       ['!src/**/_*', 'src/*.pug'],
        pugBlocks: ['!src/**/_*','!src/*.pug', 'src/**/*.pug'],
        css:       'src/css/main.scss',
        cssBlocks: ['!src/**/_*','!src/css/main.scss', 'src/**/*.scss'],
        js:        'src/js/main.js',
        jsBlocks:  ['!src/**/_*','!src/js/main.js', 'src/**/*.js'],
        img:       'src/**/images/**/*.*',
        fonts:     'src/fonts/**/*.*'
    },
    watch: {
        js:    'src/**/*.js',
        pug:   'src/**/*.pug',
        css:   'src/**/*.scss',
        img:   'src/**/images/**.*',
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
    logPrefix: 'template_build_project'
};


gulp.task('ftp', function () {
    return gulp.src('dist/**/*')
        .pipe(ftp({
            host: '*hostname*',
            user: '*username*',
            pass: '*password*',
            remotePath: '*/path/path*'
        }))
        .pipe(gutil.noop());
});



// Basic Task


gulp.task('pug:build', function() {
    return gulp.src(path.src.pug)
        .pipe(pug({
            pretty: true
        }))
        .pipe(htmlbeauty({
            indentSize: 4
        }))
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({ stream: true }));
})


gulp.task('js:build', function() {
    return gulp.src(path.src.js)
        .pipe(imports())
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
        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false,
            grid: true
        }))
        .pipe(csscomb())
        .pipe(media_group())
        .pipe(replace('images/','../images/'))
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.css))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({ stream: true }));
});



gulp.task('css:critical', function() {
    return gulp.src(['!dist/css/*.min.css', 'dist/css/*.css'])
        .pipe(criticalCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(replace('../images/','images/'))
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(gulp.dest(path.dist.css))
})



gulp.task('images:build', function() {
    gulp.src(path.src.img)
        .pipe(flatten({ includeParents: 0}))
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.img))
});



gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});



gulp.task('build', [
    'pug:build',
    'js:build',
    'css:build',
    'images:build',
    'fonts:build',
    'pug:blocks',
    'css:blocks',
    'css:critical',
    'js:blocks',
    'images:blocks',
])



gulp.task('watch', ['images:build', 'fonts:build', 'css:build', 'js:build', 'pug:build'], function () {
    gulp.watch(path.watch.css, ['css:build', 'css:critical'])
    gulp.watch(path.watch.js, ['js:build'])
    gulp.watch(path.watch.pug, ['pug:build'])
    gulp.watch(path.watch.img, ['images:build', 'images:blocks'])
})



gulp.task('webserver', function() {
    browserSync(config);
});



gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});



gulp.task('default', ['build', 'webserver', 'watch']);







// Tasks blocks


gulp.task('pug:blocks', function() {
    return gulp.src(path.src.pugBlocks)
        .pipe(pug({
            pretty: true
        }))
        .pipe(htmlbeauty({
            indentSize: 4
        }))
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.blocks))
        .pipe(reload({ stream: true }));
})



gulp.task('js:blocks', function() {
    return gulp.src(path.src.jsBlocks)
        .pipe(imports())
        .pipe(gulp.dest(path.dist.blocks))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.blocks))
})



gulp.task('css:blocks', function() {
    return gulp.src(path.src.cssBlocks)
        .pipe(sass())
        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false,
            grid: true
        }))
        .pipe(csscomb())
        .pipe(media_group())
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.blocks))
})



gulp.task('images:blocks', function() {
    gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.blocks))
});
