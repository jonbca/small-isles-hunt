module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['public/javascripts/*.js'],
            options: {
                globals: {
                    console: false,
                    Crafty: false
                },
                browser: true
            }
        },
        watch: {
            files: ['<%= jshint.files %>']
        }
    });
};