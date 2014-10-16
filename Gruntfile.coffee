
module.exports = (grunt) ->
    'use strict'

    require('load-grunt-tasks')(grunt)

    grunt.initConfig {
        pkg: grunt.file.readJSON 'package.json'
        banner: {
            compact: '/*! <%= pkg.name %> <%= pkg.version %> (Custom Build) | <%= pkg.license %> */'
            full: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
        }
        clean: {
            files: ['dist']
        }
        concat: {
            options: {
                banner: '<%= banner %>'
                stripBanners: true
            }
            dist: {
                src: ['<%= concat.dist.dest %>']
                dest: 'dist/<%= pkg.name %>.js'
            }
        }
        uglify: {
            options: {
                banner: '<%= banner %>'
            }
            dist: {
                src: '<%= concat.dist.dest %>'
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
        requirejs: {
            compile: {
                options: {
                    name: 'config'
                    mainConfigFile: 'app/config.js'
                    out: '<%= concat.dist.dest %>'
                    optimize: 'none'
                }
            }
        }
    }

    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-qunit')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-requirejs')
    grunt.loadNpmTasks('grunt-contrib-connect')

    grunt.registerTask 'default', ['clean', 'requirejs', 'concat', 'uglify']
