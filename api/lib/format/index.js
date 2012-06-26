var method_generate_keys_fn_map = {
  'POST' : require('./set.js'),
  'GET' : require('./get.js')
};

function format(req, res, next){
  method_generate_keys_fn_map[req.method](req.data, req.username);
  next();
};

module.exports = [format];
