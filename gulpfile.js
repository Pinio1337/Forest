const GulpClient = require('gulp');
const {src, dest, series, parallel, watch} = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const kit = require('gulp-kit');
const browserSync = require('browser-sync').create();

const paths = {
    sass: './src/sass/**/*.scss',
    javaScript: './src/js/**/*.js',
    img: './src/img/*',
    sassDest: './dist/css',
    javaScriptDest: './dist/js',
    imgDest: './dist/img',
    dist: './dist',
    html: './html/**/*.kit'
}

function sassCompiler(done) {
    src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.sassDest))
    done()
}
function javaScript(done) {
    src(paths.javaScript)
        .pipe(sourcemaps.init())
           .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.javaScriptDest))
    done()
}

function convertImages(done) {
    src(paths.img)
        .pipe(imagemin())
        .pipe(dest(paths.imgDest))
    done()
}
const startBrowserSync = (done) => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    done();
}
const watchForChanges = (done) => {
    watch('./*.html').on("change", browserSync.reload);
    watch([paths.html, paths.sass, paths.javaScript], parallel(handleKits, sassCompiler, javaScript)).on("change", browserSync.reload)
    watch(paths.img, convertImages).on("change", browserSync.reload)
    done();  
}
const cleanStuff = (done) => {
    src(paths.dist, { read: false })
    .pipe(clean())
    
    done()
}
const handleKits = (done) => {
    src(paths.html)
        .pipe(kit())
    .pipe(dest('./'))
    done()
}
const mainFunctions = parallel(handleKits,sassCompiler, javaScript, convertImages)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges)