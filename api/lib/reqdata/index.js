var method_data_map = {
  'POST' : 'body',
  'GET' : 'query'
};

module.exports = function(req, res, next){
  req.data = req[method_data_map[req.method]]; //this shouldn't be here
  next();
};
