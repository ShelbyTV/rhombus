var get = require('../lib/get.js');
var set = require('../lib/set.js');
var respond = require('../lib/respond.js');

exports.login = function(req, res){
  if (req.query.email.indexOf('@shelby.tv')!==-1 && req.query.pwd==='rhombus'){
    setTimeout(function(){
      respond(null, {
        token : 'Basic c2hlbGJ5Ol9yaG9tYnVzX2d0' 
      }, res);
    }, 400);
  } else {
    respond('bad password', null, res);
  }
};

exports.get = function(req, res, cmd){
  get(req.data, cmd, function(e, r){
    respond(e, r, res);
  });
};

exports.set = function(req, res, cmd){
  set(req.data, cmd, function(e, r){
    respond(e, r, res);
  });
};
