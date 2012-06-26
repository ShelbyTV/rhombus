var keygen = require('../keygen');

function generate_keys_get(data, username){
  
  var skip = data.skip || 0
  , limit = data.limit || 24;


  var key = Array.isArray(data.args) ? data.args[0] : data.args;

  data.keys = [];

  for (var s=0; s<limit; s++) {
    data.keys.push(keygen.get_hourly({user_id:username, key:key, skip:skip+s, t:data.t}));
  }
};

module.exports = generate_keys_get;
