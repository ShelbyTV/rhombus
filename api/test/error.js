var redis = require('redis').createClient();
redis.sadd.apply(redis, ['foo', function(e, r){
  console.log(e.toString(), r);
}]);
