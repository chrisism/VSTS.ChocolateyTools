var gulp = require('gulp');
var jeditor = require('gulp-json-editor');
var bump = require('gulp-bump');
var semver = require('semver');

var fs = require('fs');
var cp = require('child_process');

var config = require('./settings.tfx.json');


var getPackageJson = function () {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

gulp.task('semver-patch', (bc) => {
    console.log('Semver patching');
    config.semver = 'patch';
    return bc();
});

gulp.task('semver-minor', (bc) => {
    console.log('Semver minor');
    config.semver = 'minor';
    return bc();
});

gulp.task('getVersion', (bc) => {

    var pkg = getPackageJson();
    var packageVersion = pkg.version;

    if (config.semver !== '') {
        packageVersion = semver.inc(pkg.version, config.semver);
    }
    
    config.version = packageVersion;
    console.log('Version package ' + config.version);
    return bc();
});

gulp.task('updateVersionInPackageFile', () => {
    
    return gulp.src('./package.json', { base: './' })
        .pipe(bump({ version: config.version }))
        .pipe(gulp.dest('./'));
});


gulp.task('updateVersionInMainJson', () => {
    
    return gulp.src('./vss-extension.json', { base: './' })
        .pipe(bump({ version: config.version }))
        .pipe(gulp.dest('./'));
});

gulp.task('updateVersionInTasks', () => {

    return gulp.src([
        './ChocolateyInstalled/task.json',
        './ChocolateyInstallPackage/task.json'
    ], { base: './' })
        .pipe(jeditor({
            "version": {
                "Major": semver.major(config.version),
                "Minor": semver.minor(config.version),
                "Patch": semver.patch(config.version)
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('createPackage', () => {

    return cp.exec('tfx extension create --manifest-globs ' + config.package.manifestGlobs);
});

gulp.task('publish', () => {

    var command = 'tfx extension publish --token ' + config.publish.token +' --auth-type pat ---service-url ' + config.publish.galleryUrl;
    return cp.exec(command);
});

gulp.task('setVersion', gulp.parallel('updateVersionInPackageFile', 'updateVersionInMainJson', 'updateVersionInTasks'));
gulp.task('semver-up', gulp.series('getVersion', 'setVersion'));

gulp.task('build', gulp.series('semver-up', 'createPackage'));
gulp.task('build-minor', gulp.series('semver-minor', 'build'));
gulp.task('build-patch', gulp.series('semver-patch', 'build'));

gulp.task('build-publish', gulp.series('build', 'publish'));
gulp.task('build-publish-minor', gulp.series('build-minor', 'publish'));
gulp.task('build-publish-patch', gulp.series('build-patch', 'publish'));

gulp.task('default', gulp.series('build'), function () { });
