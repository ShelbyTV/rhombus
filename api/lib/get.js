var apply_keys = require('./apply_keys');
var redis = require('redis').createClient();

var GET = function(data, cmd, cb){

  var multi = redis.multi(); //grr .. multis
  
  data.keys.forEach(function(key){
    multi[cmd].call(multi, key);
  });

  multi.exec(function(e, results){
    var _data = apply_keys(data.keys, results);
    if (!_data) return cb('Bad keys || no results');
    return cb(e, _data);
  });

};

module.exports = GET;
