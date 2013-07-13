module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['default']
        },
        browserify: {
            'build/scripts/game.js': ['public/javascripts/game.coffee'],
            options: {
                transform: ['coffeeify', 'deamdify'],
                alias: ['public/javascripts/vendor/crafty:crafty']
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['**/*'],
                        dest: 'build/styles',
                        cwd: 'public/stylesheets'
                    },
                    {
                        expand: true,
                        src: ['images/**/*', 'index.html'],
                        dest: 'build',
                        cwd: 'public'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify', 'copy']);
    grunt.registerTask('develop', ['default', 'watch']);
};