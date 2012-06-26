var redis = require('redis').createClient();

var SET = function(data, cmd, cb){

  data.args.push(function(e, r){
    e = e ? e.toString() : null;
    return cb(e, r);
  }); 

  redis[cmd].apply(redis, data.args);

};

module.exports = SET;
