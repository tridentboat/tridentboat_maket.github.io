var gulp         = require ('gulp'),
    less         = require ('gulp-less'),
    browserSync  = require ('browser-sync'),
    concat       = require ('gulp-concat'),
    uglify       = require ('gulp-uglify');
    del          = require ('del');
    imagrmin     = require ('gulp-imagemin');
    pngquant     = require ('imagemin-quant');
    cache        = require ('gulp-cache');
    autoprefixer = require ('gulp-autoprefixer');

gulp.task('less', function (){
  return gulp.src('app/less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer(['last 5 versions', { cascade: true }]))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function (){
  browserSync ({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('clean', function (){
  return del.sync('dist');
});

gulp.task('clear', function (){
  return cache.clearAll();
});

gulp.task('img', function(){
  return gulp.src('app/img/**/*')
  .pipe (cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pmgquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'less'], function(){
  gulp.watch('app/less/**/*.less', ['less']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'less'], function() {
  var buildFonts = gulp.src('app/fonts/**/*.')
    .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
});
