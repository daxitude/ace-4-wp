module.exports = function(grunt) {
	
	// $ grunt, or (1) increment version and (2) $ grunt deploy
	grunt.initConfig({
		
		pkg: {
			name: 'ACE Editor for WP',
			version: '0.7.1',
			author: 'Dax Ponce de Leon'
		},
		meta: {
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */'
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', 'aceinit.dev.js'],
				dest: 'aceinit.min.js',
				separator: ';'
			}
		},
		uglify: {
			mangle: {toplevel: true}
		}
		
	});

	// tasks
	grunt.registerTask('default', 'min');

};