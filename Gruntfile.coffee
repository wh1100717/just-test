
module.exports = (grunt) ->
    'use strict'

    require('load-grunt-tasks')(grunt)

    grunt.initConfig {
        pkg: grunt.file.readJSON 'package.json'
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
        karma: {
            unit: {
                configFile: 'karma.conf.js'
                singleRun: true
            }
        }
        clean: {
            build: ['dist']
            release: ['dist/*', '!dist/localdb{.,.min.}js']
        }
        requirejs: {
            ### r.js exmaple build file
             *  https://github.com/jrburke/r.js/blob/master/build/example.build.js
            ###
            compile: {
                options: {
                    appDir: 'src/'
                    dir: 'dist/'
                    optimize: 'none'
                }
            }
        }
        concat: {
            options: {
                banner: '<%= banner %>'
                stripBanners: true
            }
            dist: {
                src: ['dist/**/*.js']
                dest: 'dist/localdb.js'
            }
        }
        uglify: {
            options: {
                banner: '<%= banner %>'
            }
            dist: {
                src: '<%= concat.dist.dest %>'
                dest: 'dist/localdb.min.js'
            }
        }
        coveralls: {
            options: {
                debug: true
                coverage_dir: 'coverage/'
                dryRun: true
                force: true
                recursive: true
            }
        }
    }

    grunt.registerTask 'default', ['karma', 'coveralls']

    grunt.registerTask 'test', ['default']

    grunt.registerTask 'build', ['karma', 'coveralls', 'clean:build', 'requirejs', 'concat', 'uglify', 'clean:release']

