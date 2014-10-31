module.exports = function(grunt) {

  require('time-grunt');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    config: grunt.file.readJSON('grunt.config.json'),

    clean: {
      build: ['<%= config.buildDir %>']
    },

    browserify: {
      app: {
        src: ['client/js/main.js'],
        dest: '<%= config.buildDir %>/js/main.js'
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
          '<%= config.buildDir %>/css/main.css': './client/css/main.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= config.buildDir %>/css/main.css': './client/css/main.scss'
        }
      }
    },

    concat: {
    },

    copy: {
      css: {
        src: '<%= config.buildDir %>/css/main.css',
        dest: '<%= config.publicDir %>/css/main.css'
      },
      js: {
        src: '<%= config.buildDir %>/js/main.js',
        dest: '<%= config.publicDir %>/js/main.js'
      }
    },

    uglify: {
      dist: {
        options: {
          compress: true
        },
        files: [{
          src: './build/js/main.js',
          dest: '<%= config.publicDir %>/js/main.js'
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
