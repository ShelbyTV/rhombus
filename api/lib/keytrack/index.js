var redis = require('redis').createClient();
var KEY_SUFFIX = ':keys';

function track_key(user, key, cb){
  redis.sadd(user+KEY_SUFFIX, key, cb);
}

module.exports = function(req, res, next){
  track_key(req.username, req.data.args[0], function(){
    return next();
  });
}
