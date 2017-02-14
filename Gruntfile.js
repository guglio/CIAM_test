/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/
'use strict';

var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {
    grunt.initConfig({
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [
                    {
                        width: 900,
                        quality: 100,
                        rename: false,
                        upscale:true,
                    },
                    {
                        width: 1350,
                        quality: 70,
                        rename: false,
                        suffix: '@1.5x',
                        upscale:true,

                    }, {
                        width: 1800,
                        quality: 70,
                        rename: false,
                        suffix: '@2x',
                        upscale:true,

                    },{
                        width: 600,
                        quality: 70,
                        rename: false,
                        suffix: 'S',
                        upscale:true,

                    }, {
                        width: 900,
                        quality: 70,
                        rename: false,
                        suffix: 'S@1.5x',
                        upscale:true,

                    }, {
                        width: 1200,
                        quality: 70,
                        rename: false,
                        suffix: 'S@2x',
                        upscale:true,

                    }]
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'images_src/projects/',
                    dest: 'images_src/projects_multi/'
                }]
            }
        },
        /* Clear out the images directory if it exists */
        clean: {
            dev: {
                src: ['images','images_src/projects_multi/'],
            },
        },
        /* Generate the images directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['images/']
                },
            },
        },
        /* Copy the "fixed" images that don't go through processing into the images/directory */
        // copy: {
        //     dev: {
        //         files: [{
        //             expand: true,
        //             src: 'images_src/*.{gif,jpg,png,svg}',
        //             dest: 'images/',
        //             flatten: true
        //         }]
        //     },
        // },
        imagemin: {                          // Task
          dynamic: {
            options: {                       // Target options
              optimizationLevel: 3,
              svgoPlugins: [{ removeViewBox: false }]
            },                        // Another target
            files: [{
              expand: true,                  // Enable dynamic expansion
              src: '*.{gif,jpg,png}',
              cwd: 'images_src/projects_multi/',
              dest: 'images/projects/'
            },{
              expand: true,                  // Enable dynamic expansion
              src: '*.{gif,jpg,png}',
              cwd: 'images_src/',
              dest: 'images/'
            }]
          }
        },
        uglify: {
          my_target: {
            files: {
              'js/app.min.js':['js/app.js'],
              'js/main.min.js':['js/main.js'],
            }
          }
        },
        watch: {
          js: {
            files: ['js/app.js','js/main.js'],
            tasks: ['uglify']
          }
        }
    });
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['clean', 'mkdir','responsive_images','imagemin']);
};
