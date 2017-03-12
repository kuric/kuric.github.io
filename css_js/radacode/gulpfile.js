var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	dest = require('gulp-dest'),
	del = require('del'),
	imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.+(sass|scss)')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// gulp.task('scripts', function() {
// 	return gulp.src([
// 		'app/libs/plugin1',
// 		'app/libs/plugin2'
// 		])
// 	.pipe(concat('libs.min.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('app/js'));
// });
//require('es6-promise').polyfill();



gulp.task('cssConcat', ['sass'] ,function() {
	return gulp.src('app/css/**/*.css')
	.pipe(concat('style.css'))
	.pipe(gulp.dest('app/css'));
});

gulp.task('cssMinify',['sass'], function() {
	return gulp.src('app/css/style.css')
		.pipe(cssnano())
		.pipe(dest({ext: '.min.css'}))
		.pipe(gulp.dest('app/css/'));
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build',['clean','img','sass','cssConcat'], function(){
	var buildCss = gulp.src('app/css/style.css')
	.pipe(cssnano())
	.pipe(dest({ext: '.min.css'}))
	.pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));
});

gulp.task('watch',['browser-sync', 'cssConcat'] , function() {
	gulp.watch('app/sass/**/*.+(sass|scss)', ['sass'])
	gulp.watch('app/*.html', browserSync.reload); 
});