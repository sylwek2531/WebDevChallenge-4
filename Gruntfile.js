module.exports = function (grunt)
{

    var serveStatic = require('serve-static');

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        sass: {
            dist: {
                options: {                       // Target options
                    style: 'expanded',
                    noCache: true
                },
                files: {
                    'app/user-style/style.css': 'app/user-style/style.scss'
                }
            }
        },
        autoprefixer:{
            dist:{
                files:{
                    'app/user-style/style.css': 'app/user-style/style.css'
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/**/*.html',
                    'app/**/*.js',
                    'app/**/*.css',
                    'app/**/*.scss'
                ]
            },
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'autoprefixer']
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // hostname: 'localhost'
                hostname: '192.168.2.185'
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect)
                    {
                        return [connect().use('/bower_components', serveStatic('./bower_components')), serveStatic('app')];
                    }
                }
            }
        }
    });

    grunt.registerTask('serve', function ()
    {
        grunt.task.run(['connect:livereload', 'watch']);
    });

    grunt.registerTask('default', ['serve','sass', 'autoprefixer']);
};
