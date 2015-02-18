'use strict';

// load dependencies
var fs        = require('fs'),
	util      = require('gulp-util'),
	through   = require('through2'),
	requirejs = require('requirejs');

// Constants
var PLUGIN_NAME = 'gulp-afom-requirejs';

module.exports = function(opt) {

	var compile = function(file, enc, cb) {
		// check for file
		if (file.isNull()) {
			return cb(null, file);
		}

		// check if file is a stream
		if (file.isStream()) {
			return cb(new util.PluginError(PLUGIN_NAME, 'Streaming not supported'));
		}

		var successCallback = function() {
			// empty file content
			file.contents = null;

			// try to read output file
			fs.readFile(opt.out, function (err, contents) {
				// check if file exists/can be read
				if (err) {
					return cb(new util.PluginError(PLUGIN_NAME, 'Failure reading in the JS output file'));
				}

				// if file content is not a buffer object
				// then create one
				if (!(contents instanceof Buffer)) {
					contents = new Buffer(contents);
				}

				// update file content
				file.contents = contents;

				// return callback with out file
				return cb(null, file);
			});
		};

		var errorCallback = function(err){
			// trigger requirejs error
			return cb(new util.PluginError(PLUGIN_NAME, err));
		};

		// run requirejs optimize
		requirejs.optimize(opt, successCallback, errorCallback);

	};

	return through.obj(compile);

};
