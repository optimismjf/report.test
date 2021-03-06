var gulp 		 = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет
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
	return gulp.src('marmelad/styles/*.sass') // Берем источник
    .pipe(sourcemaps.init())
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer({
	      browsers: ['last 15 versions'],
	      cascade: false
	    })) // Создаем префиксы
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('static/css')) // Выгружаем результата в папку app/css
    .pipe(browserSync.stream());
});

gulp.task('nunjucks', function() {
  return gulp.src('marmelad/views/*.njk')
    .pipe(njkRender())
    .pipe(prettify({
      indent_size : 4 // размер отступа - 4 пробела
    }))
    .pipe(gulp.dest('static'));
});

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "report.test",
    notify: false,
  });
  gulp.watch('marmelad/styles/*.sass', gulp.parallel('sass'));
  gulp.watch('marmelad/styles/*.scss', gulp.parallel('sass'));
  gulp.watch('marmelad/**/*.styl', gulp.parallel('stylus'));
  gulp.watch('marmelad/views/**/*.njk', gulp.parallel('nunjucks'));
  browserSync.watch('static/**/*.*').on('change', browserSync.reload);
});

gulp.task('stylus', function() {
  return gulp.src('marmelad/styles/style.styl')
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
    .pipe(gulp.dest('static/css'))
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
  gulp.src(globs, {buffer: false})
    .pipe( conn.newer( '/public_html/new' ) ) // only upload newer files
    .pipe( conn.dest( '/public_html/new' ) );
});

gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'stylus', 'nunjucks'));
// gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'stylus'));

gulp.task('default', gulp.parallel('watch'));