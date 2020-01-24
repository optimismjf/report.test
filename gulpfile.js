var gulp 		 = require('gulp'), // Подключаем Gulp
  { src, dest, watch, series, parallel } = require('gulp'), // Подключаем команды Gulp
	sass         = require('gulp-sass'), // Подключаем Sass пакет
  svgSprite = require('gulp-svg-sprite'), // Подключаем сборщик спрайтов
  webp         = require('gulp-webp'), // Подключаем компилятор Webp
  browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	nib 		 = require('nib'),
	stylus 		 = require('gulp-stylus'),
	notify 		 = require("gulp-notify"),
	plumber 	 = require('gulp-plumber'),
	ftp 		 = require('vinyl-ftp'),
	gutil 		 = require('gulp-util'),
  njkRender = require('gulp-nunjucks-render'),
  prettify = require('gulp-html-prettify'),
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
  sourcemaps = require('gulp-sourcemaps');


gulp.task('sass', function(){ // Создаем таск Sass
  return src('marmelad/styles/*.sass') // Берем источник

    .pipe(sourcemaps.init())
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
/*		.pipe(autoprefixer({
	      browsers: ['last 15 versions'],
	      cascade: false
	    })) // Создаем префиксы*/
    .pipe(sourcemaps.write())
		.pipe(dest('static/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.stream());
});

gulp.task ('sprite', function () {

    config = {
        shape: {
            dimension: {
                maxWidth: 32,
                maxHeight: 32
            },
            spacing: { padding: 0 },
        },
        mode: { symbol: true }
    };

    return src('static/images/icon/svg-sprite/*.svg'/*,{ cwd: 'images/svg' }*/)
        .pipe(svgSprite(config))
        .pipe(dest('static/images/icon/svg-sprite/'));
});

gulp.task("webp", function () {
    return src("static/images/**/*.{png,jpg}")
        .pipe(webp({quality: 100}))
        .pipe(dest("static/images/webp"));
});

gulp.task('nunjucks', function() {
  return src('marmelad/views/*.njk')
    .pipe(njkRender())
    .pipe(prettify({
      indent_size : 4 // размер отступа - 4 пробела
    }))
    .pipe(dest('static'));
});

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: "./static",
            index: "projects_test.html"
        }
    });

    watch('marmelad/styles/*.sass', parallel('sass'));
    watch('marmelad/styles/ui-kits/*.sass', parallel('sass'));
    watch('marmelad/styles/*.scss', parallel('sass'));
    watch('static/images/icon/svg-sprite/*.svg', parallel('sprite'));
    watch('marmelad/**/*.styl', parallel('stylus'));
    watch('marmelad/views/**/*.njk', parallel('nunjucks'));
    browserSync.watch('static/**/*.*').on('change', browserSync.reload);
});

gulp.task('stylus', function() {
  return src('marmelad/styles/_import-legacy.styl')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    .pipe(stylus({
      use: nib(),
      compress: false,
    }))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('static/css'))
    .pipe(notify('Stylus SUCCESS'));
});
 
gulp.task('deploy', async function () {

	// Файлы для копирования по ftp
	var globs = [
	    'static/**/*.*'
	],

	conn = ftp.create({
    host:     'testfront.saitreport.ru',
    user:     'testfront_sitereport',
    password: 'sedrw12'
  });
  src(globs, {buffer: false})
    //.pipe( conn.newer( '/public_html/m.kolyadin' ) ) // only upload newer files
    .pipe( conn.dest( '/public_html/m.kolyadin' ) );
});

gulp.task('watch', parallel('browser-sync', 'sass', 'stylus', 'sprite', 'nunjucks'));

gulp.task('default', parallel('watch'));