var path = require('path');
module.exports = function( grunt ) {
	 // Internal lib.
  	var snipper = require('./lib/snipper.js').init(grunt);
  	 grunt.registerMultiTask('snipper', 'The assembly of file fragments', function() {
  	 	var options = this.options({
	      compress: false
	    });

	    // Iterate over all src-dest file pairs.
	    this.files.forEach(function (f) {
	    
	      var src = f.src.filter(function (filepath) {

	        // Warn on and remove invalid source files (if nonull was set).

	        if (!grunt.file.exists(filepath)) {
	          grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
	          return false;
	        } else {
	          return true;
	        }
	      });

	      if (src.length === 0) {
	        grunt.log.warn('Destination ' + chalk.cyan(f.dest) + ' not written because src files were empty.');
	        return;
	      }

	      src.forEach(function(file) {
	         var fn = path.basename(file);
	         var build = f.dest+fn;
	         file = file.split("\\").join('/');
	         build = build.split("\\").join('/');
	         !/^[a-z]{1,4}:/i.test(file) && (file = process.cwd()+(file.substr(0,1)!=='/' ? '/' : '')+file); 
	         !/^[a-z]{1,4}:/i.test(build) && (build = process.cwd()+(build.substr(0,1)!=='/' ? '/' : '')+build); 
	         
	         snipper.render(file, build);
	      	 grunt.log.writeln('File '+file+' rendered to '+f.dest+fn);
	      });
	    
	    });
  	 });
};
