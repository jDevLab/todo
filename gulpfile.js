var lr = require('tiny-lr'),
    gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    sftp = require('gulp-sftp'),
    minifyCss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    connect = require('connect'),
    server = lr(),
    prompt = require('gulp-prompt');


gulp.task('css', function() {
    gulp.src('./app/css/*.css')
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css/')) 
        .pipe(livereload(server));
});

gulp.task('js', function () {
    gulp.src(['./app/js/**/*.js'])
        .pipe(concat('main.js')) 
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload(server));
});

gulp.task('libJs', function () {
    gulp.src(['./app/lib/**/*.js'])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload(server));
})

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'))
        .pipe(livereload(server));
});



gulp.task('http-server', function() {
    connect()
        .use(require('connect-livereload')())
        .use(connect.static('./dist'))
        .listen('9000');

    console.log('Server listening on http://localhost:9000');
});

gulp.task('default', function() {
    gulp.run('debugging');
});

gulp.task('build', function () {
    gulp.run('html');
});


gulp.task('deploy', function () {
    gulp.run('build');

    server.listen(35729, function (err) {
        if (err) return console.log(err);
    });
    gulp.run('http-server');
});

gulp.task('debugging', function () {
    gulp.run('build');

    server.listen(35729, function (err) {
        if (err) return console.log(err);

        gulp.watch('app/*.html', function () {
            gulp.run('html');
        });
        gulp.watch('app/js/**/*.js', function () {
            gulp.run('js');
        });
        gulp.watch('app/lib/**/*.js', function () {
            gulp.run('js');
        });
        gulp.watch('app/css/*.css', function () {
            gulp.run('css');
        });
    });
    gulp.run('http-server');
});
