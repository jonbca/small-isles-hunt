
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure('development', function () {
    app.use(require('connect-livereload')({port: 35729}));
});

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.compress());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000}));
app.use(express.static(path.join(__dirname, 'build')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
