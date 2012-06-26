var keygen = require('../keygen');

function generate_keys_post(data, username){
  console.log('DATA', data);
  data.args[0] = keygen.get_hourly({user_id:username, key:data.args[0], t:data.t});
};

module.exports = generate_keys_post;
