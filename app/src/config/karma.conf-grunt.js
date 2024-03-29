<%
var cfgJson = grunt.config('cfgJson');
%>

module.exports = function (config) {
	config.set({
		basePath: '../',

		files: [
			<%
			var filePaths = grunt.config('filePathsJsNoPrefix');
			for(var ii=0; ii<filePaths.length; ii++) {
				if(ii !=0) {
					print('\t\t\t');
				}
				print('"'+filePaths[ii] + '",\n');
			}
			%>
		
			// 'lib/angular/angular-*.js',
			'test/lib/angular/angular-mocks.js',

			// 'test/unit/**/*.js',
			
			// Test-Specs
			// '**/*.spec.js'
			// '**/spec.*.js'
			<%
			var filePaths = grunt.config('filePathsJsTestNoPrefix');
			for(var ii=0; ii<filePaths.length; ii++) {
				if(ii !=0) {
					print('\t\t\t');
				}
				print('"'+filePaths[ii] + '",\n');
			}
			%>
		],

		frameworks: ['jasmine'],

		autoWatch: true,

		// browsers: ['Chrome'],
		browsers: [],

		junitReporter: {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		},
		
		//code coverage (with Instanbul - built into Karma)
		preprocessors: {
			// '**/*.js':['coverage']
			<%
			var filePaths = grunt.config('filePathsJsCustom');
			for(var ii=0; ii<filePaths.length; ii++) {
				if(ii !=0) {
					print('\t\t\t');
				}
				print('"'+filePaths[ii] + '":["coverage"],\n');
			}
			%>
		},
		reporters: ['coverage'],
		coverageReporter: {
			type: 'html',
			// type: 'lcov',
			dir: 'coverage-angular/'
		}
		
	});
};