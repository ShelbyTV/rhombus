var get = require('../lib/get.js');
var set = require('../lib/set.js');
var respond = require('../lib/respond.js');

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
