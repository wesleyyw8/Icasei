module.exports = function(grunt){
	grunt.initConfig({
		concat:{
			js:{
				src: ['controllers/*.js'],
				dest: 'application.js'
			}
		},
    less: {
      'style.css': ['css/*.less']
    },
		watch: {
			scripts: {
        files: ['controllers/*.js'],
        tasks: ['concat:js']
			},
			less: {
        files: ['css/*.less'],
        tasks: ["less"],
        options: {
            livereload: true
        }
      },
			livereload: {
        options: {
          livereload: true
        },
        files: ['controllers/*.js','css/*.less']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.registerTask('default', ['concat:js','less','watch']);
};