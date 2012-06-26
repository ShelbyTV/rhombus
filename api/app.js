var routes = require('./routes')
, get_app = require('./lib/get_app.js')
, auth = require('./lib/auth')
, reqdata = require('./lib/reqdata')
, keytrack = require('./lib/keytrack')
, format = require('./lib/format')
, commands = require('./config/commands');

var app = module.exports = get_app();

commands.enabled.set.forEach(function(cmd){
  app.post('/'+cmd, auth, reqdata, keytrack, format, function(req, res){
    routes.set(req, res, cmd);
  });
});

commands.enabled.get.forEach(function(cmd){
  app.get('/'+cmd, auth, reqdata, format, function(req, res){
    routes.get(req, res, cmd);
  });
});

var uri_map = {
  production:'127.0.0.1',
  development:'localhost.shelby.tv'
};

var uri = uri_map[process.env.NODE_ENV];

if (!uri){
  console.log('specify NODE_ENV');
  process.exit();
}

app.listen(3010, uri, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
