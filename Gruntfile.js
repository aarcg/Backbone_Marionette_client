module.exports = function(grunt) {

  require('time-grunt');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    clean: {
      build: ['./build']
    },

    browserify: {
      app: {
        src: ['client/js/main.js'],
        dest: 'build/js/main.js'
      }
    },

    jshint: {
      all: {
        files: {
          src: ['Gruntfile.js',
                './client/js/**/*.js']
        },
        options: {
          force: false
        }
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          './build/css/main.css': './client/css/main.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          './build/css/main.css': './client/css/main.scss'
        }
      }
    },

    concat: {
    },

    copy: {
      css: {
        src: './build/css/main.css',
        dest: './public/css/main.css'
      },
      js: {
        src: './build/js/main.js',
        dest: './public/js/main.js'
      }
    },

    uglify: {
      dist: {
        options: {
          compress: true
        },
        files: [{
          src: './build/js/main.js',
          dest: './public/js/main.js'
        }]
      }
    },

    watch: {
      css: {
        files: 'client/css/*.scss',
        tasks: ['sass:dev', 'copy:css']
      },
      js: {
        files: 'client/js/**/*.js',
        tasks: ['jshint', 'browserify', 'copy:js']
      }
    }

  });

  grunt.registerTask('build:dev', ['clean', 'sass:dev', 'jshint', 'browserify', 'copy']);
  grunt.registerTask('build:dist', ['sass:dist', 'concat', 'copy:css', 'uglify']);
};
