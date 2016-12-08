/// <binding ProjectOpened='exec:update' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        settings: grunt.file.readJSON("settings.tfx.json"),
        exec: {
            update: {
                command: "npm up --save-dev",
                stdout: true,
                stderr: true
            },
            publish_task: {
                command: "tfx build tasks upload --token <%= settings.publish.token %> --auth-type pat --task-path ./ExampleTask --service-url <%= settings.serviceUrl %>",
                stdout: true,
                stderr: true
            },
            publish_ext: {
                command: "tfx extension publish --token <%= settings.publish.token %> --auth-type pat --service-url <%= settings.serviceUrl %>",
                stdout: true,
                stderr: true
            },
            package: {
                command: "tfx extension create --manifest-globs <%= settings.package.manifestGlobs %>",
                stdout: true,
                stderr: true
            }
        },
        jasmine: {
            src: ["scripts/**/*.js"],
            specs: "test/**/*[sS]pec.js",
            helpers: "test/helpers/*.js"
        }
    });

    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jasmine");

};