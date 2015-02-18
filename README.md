# gulp-afom-requirejs
Execute RequireJS optimization

### Information
Really simple gulp plugin to optimize RequireJS applications using the native RequireJS optimizer.

It supports any option described on [RequireJS documentation page](http://requirejs.org/docs/optimization.html).

```
$ npm install gulp-afom-requirejs --save-dev
```

### How to use

```javascript

// configuration object as described on RequireJS website documentation
var config = {
	baseUrl: __dirname + '/public/js/',
	name: 'main',
	out: 'main.min.js',
	paths: {
		jquery: 'empty:',
		backbone: 'vendor/backbone',
		underscore: 'vendor/underscore'
	},
	shim: {

	}
};

// Gulp task
gulp
  .src('./public/js/main.js')
  .pipe(afomRequire(config))
  .on('error', notify.onError({
    message: 'Error: <%= error.message %>',
    title: 'Error running something'
  }))
  .pipe(gulp.dest(__dirname + '/public/js/'))
  .pipe(notify({
    message: '<%= file.relative %> compiled!',
    title: 'Gulp afom requirejs'
  }));
```

### What's missing
It doesn't support RequireJS plugins...yet!
