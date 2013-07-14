module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['public/**/*'],
            tasks: ['default'],
            options: {
                livereload: 35729
            }
        },
        browserify: {
            'build/scripts/game.js': ['public/javascripts/game.coffee'],
            options: {
                transform: ['coffeeify'],
                alias: ['public/javascripts/vendor/crafty:crafty'],
                aliasMappings: [
                    {
                        cwd: 'public/javascripts',
                        src: ['**/*.coffee'],
                        dest: '',
                        flatten: true
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify']);
    grunt.registerTask('develop', ['default', 'watch']);
};