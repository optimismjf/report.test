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
  return src('src/styles/*.sass') // Берем источник

    .pipe(sourcemaps.init())
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		// .pipe(autoprefixer({
	  //     browsers: ['last 15 versions'],
	  //     cascade: false
	  //   })) // Создаем префиксы
    .pipe(sourcemaps.write())
		.pipe(dest('build/css')) // Выгружаем результата в папку app/css
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

    return src('build/images/icon/svg-sprite/*.svg'/*,{ cwd: 'images/svg' }*/)
        .pipe(svgSprite(config))
        .pipe(dest('build/images/icon/svg-sprite/'));
});

gulp.task("webp", function () {
    return src("build/images/**/*.{png,jpg}")
        .pipe(webp({quality: 100}))
        .pipe(dest("build/images/webp"));
});

gulp.task('nunjucks', function() {
  return src('src/views/*.njk')
    .pipe(njkRender())
    .pipe(prettify({
      indent_size : 4 // размер отступа - 4 пробела
    }))
    .pipe(dest('build'));
});

gulp.task('browser-sync', function() {

    browserSync.init({
        server: {
            baseDir: "./build",
            index: "invoices.html"
        }
    });

    watch('src/styles/*.sass', parallel('sass'));
    watch('src/styles/ui-kits/*.sass', parallel('sass'));
    watch('src/styles/*.scss', parallel('sass'));
    watch('build/images/icon/svg-sprite/*.svg', parallel('sprite'));
    watch('src/views/**/*.njk', parallel('nunjucks'));
    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('deploy', async function () {

	// Файлы для копирования по ftp
	var globs = [
	    'build/**/*.*'
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

gulp.task('watch', parallel('browser-sync', 'sass', 'sprite', 'nunjucks'));

 gulp.task('default', parallel('watch'));
