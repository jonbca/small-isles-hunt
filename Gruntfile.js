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
            'tmp/scripts/game.js': ['public/javascripts/game.coffee'],
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
        },
        uglify: {
            'build/scripts/game.js': ['tmp/scripts/game.js'],
            options: {
                mangle: true,
                compress: true,
                report: 'min'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['browserify', 'uglify']);
    grunt.registerTask('develop', ['default', 'watch']);
};