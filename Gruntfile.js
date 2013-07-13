var child;

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['public/**/*'],
            tasks: ['default', 'start'],
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('start', function () {
        if (child) {
            child.kill();
        }

        child = grunt.util.spawn({
            cmd: 'node',
            args: ['app.js'],
            opts: {
                stdio: 'inherit'
            }
        });
    });

    grunt.registerTask('default', ['start', 'watch']);
};