'use strict';

var gulp        = require('gulp'),
    rimraf      = require('rimraf'),
    cssbeautify = require('gulp-cssbeautify'),
    rename      = require('gulp-rename'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    gulpSequence = require('gulp-sequence'),
    reload      = browserSync.reload,
    changed     = require('gulp-changed'),

    //css
    sass        = require('gulp-sass'),
    prefixer    = require('gulp-autoprefixer'),
    csscomb     = require('gulp-csscomb'),
    media_group = require('gulp-group-css-media-queries'),
    cssmin      = require('gulp-minify-css'),

    //js
    imports     = require('gulp-imports'),
    minify      = require('gulp-minify'),

    //html, pug
    pug         = require('gulp-pug'),
    prettyHtml  = require('gulp-pretty-html'),
    html2pug    = require('gulp-html2pug'),

    //img
    tinypng     = require('gulp-tinypng-unlimited'),


    //svg
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    svgSprite = require('gulp-svg-sprite'),
    html2pug = require('gulp-html2pug');




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
        img:    'src/images/**/*.*',
        fonts:  'src/fonts/**/*.*',
        svg:    'src/images/**/*.svg'
    },
    clean: './dist',
    cleanImg: './dist/images'
};



var config = {
    server: {
        baseDir: './dist'
    },
    host: 'localhost',
    port: 3001,
};

var svgconfig = {
    shape: {
        dimension: {         // Set maximum dimensions
            maxWidth: 500,
            maxHeight: 500
        },
        spacing: {         // Add padding
            padding: 0
        }
    },
    mode: {
        symbol: {
            dest : '.'
        }
    }
};


gulp.task('svg-sprite', function (cb) {
    return gulp.src('src/images/svg-separate/**/*.svg')
        //minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
		// remove all fill and style declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
                $('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
        }))
		// cheerio plugin create unnecessary string '>', so replace it.
		.pipe(replace('&gt;', '>'))
        .pipe(svgSprite(svgconfig))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(html2pug())
        .pipe(replace('html', ''))
        .pipe(replace('head', ''))
        .pipe(replace('body', ''))
        .pipe(replace('//?xml version="1.0" encoding="utf-8"?', '.svg-sprite__symbols'))
        .pipe(gulp.dest('src/pug/partails'))
        .pipe(gulp.dest('src/pug/partails/'))
});



gulp.task('pug:build', function() {
    return gulp.src(path.src.pug)
        .pipe(changed(path.dist.html, {extension: '.html'}))
        .pipe(pug({
            pretty: true
        }))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({ stream: true }));
})


gulp.task('pug:comb', function () {
    return gulp.src(path.src.pug)
        .pipe(pug({
            pretty: true
        }))
        .pipe(prettyHtml({
            indent_size: 4,
            indent_char: ' ',
            unformatted: ['code', 'pre', 'em', 'strong', 'i', 'b', 'br']
        }))
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({ stream: true }));
});



gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(imports())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({ stream: true }));
})

gulp.task('js:min', function () {
    return gulp.src(path.src.js)
        .pipe(imports())
        .pipe(minify())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({ stream: true }));
})

gulp.task('css:build', function () {
    return gulp.src(path.src.css)
        .pipe(sass())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({ stream: true }));
});

gulp.task('css:polish', function () {
    return gulp.src(path.src.css)
        .pipe(sass())
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false,
            grid: false
        }))
        .pipe(media_group())
        .pipe(csscomb('.csscomb.json'))
        .pipe(gulp.dest(path.dist.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssmin())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({ stream: true }));
})


gulp.task('images:optimize', function (cb) {
    return gulp.src(path.src.img)
        .pipe(tinypng({
        }))
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('images:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
});


gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});


gulp.task('build', gulpSequence(
    ['svg-sprite','pug:build', 'css:build', 'js:build', 'images:optimize', 'fonts:build'],
    ['pug:comb','css:polish', 'js:min']
));

gulp.task('watch', ['svg-sprite','pug:build', 'css:build', 'js:build', 'images:build', 'images:build'], function () {
    gulp.watch(path.watch.css, ['css:build'])
    gulp.watch(path.watch.js, ['js:build'])
    gulp.watch(path.watch.pug, ['pug:build'])
    gulp.watch(path.watch.img, ['images:build'])
    gulp.watch(path.watch.svg, ['svg-sprite'])
})

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
