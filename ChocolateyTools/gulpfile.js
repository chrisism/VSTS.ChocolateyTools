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

var packageVersion;
gulp.task('getVersion', (bc) => {

    var pkg = getPackageJson();
    var packageVersion = pkg.version;

    if (config.semver !== '') {
        packageVersion = semver.inc(pkg.version, 'patch');
    }
    
    console.log('Version package ' + packageVersion);
    return bc();
});

gulp.task('updateVersionInPackageFile', () => {

    return gulp.src('./package.json', { base: './' })
        .pipe(bump({ version: packageVersion }))
        .pipe(gulp.dest('./'));
});


gulp.task('updateVersionInMainJson', () => {

    return gulp.src('./vss-extension.json', { base: './' })
        .pipe(bump({ version: packageVersion }))
        .pipe(gulp.dest('./'));
});

gulp.task('updateVersionInTasks', () => {

    return gulp.src([
        './ChocolateyInstalled/task.json',
        './ChocolateyInstallPackage/task.json'
    ], { base: './' })
        .pipe(jeditor({
            "version": {
                "Major": semver.major(packageVersion),
                "Minor": semver.minor(packageVersion),
                "Patch": semver.patch(packageVersion)
            }
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('createPackage', () => {

    return cp.execFile('tfx extension create --manifest-globs vss-extension.json');
});


gulp.task('setVersion', gulp.parallel('updateVersionInPackageFile', 'updateVersionInMainJson', 'updateVersionInTasks'));
gulp.task('semver-up', gulp.series('getVersion', 'setVersion'));
gulp.task('build', gulp.series('semver-up', 'createPackage'));
gulp.task('build-minor', gulp.series('semver-minor', 'build'));
gulp.task('build-patch', gulp.series('semver-patch', 'build'));
gulp.task('default', gulp.series('build'), function () { });
