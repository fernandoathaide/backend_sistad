var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');


gulp.task('clean', function() {
  return gulp.src('dist')
             .pipe(clean());
});

gulp.task('compile', function () {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest('dist'));
});

gulp.task('copyAllFiles', function() {//Lembrar de corrigir caminho relativo do arquivo mocha ../../../../dist/tests/unit/config/helpers.js
  gulp.src(['server/api/swagger.json']).pipe(gulp.dest('dist/server/api/'));
  gulp.src('server/seenders/*').pipe(gulp.dest('dist/server/seenders'));
  gulp.src('server/config/config.json').pipe(gulp.dest('dist/server/config'));
  gulp.src('server/migrations/*').pipe(gulp.dest('dist/server/migrations'));

  gulp.src(['server/api/swagger.json']).pipe(gulp.dest('build/server/api/'));
  gulp.src('server/seenders/*').pipe(gulp.dest('build/server/seenders'));
  gulp.src('server/config/config.json').pipe(gulp.dest('build/server/config'));
  gulp.src('server/migrations/*').pipe(gulp.dest('build/server/migrations'));
  gulp.src('tests/unit/config/mocha.opts').pipe(gulp.dest('build/tests/unit/config')).pipe(gulp.dest('build/tests/integration/config'));

  return gulp.src('tests/unit/config/mocha.opts').pipe(gulp.dest('dist/tests/unit/config')).pipe(gulp.dest('dist/tests/integration/config'));
});

// gulp.task('default', gulp.series('compile', 'copyAllFiles'));
gulp.task('default', gulp.series('clean', 'compile', 'copyAllFiles'));
