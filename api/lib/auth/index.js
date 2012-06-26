var respond = require('../respond.js');

//failure condition
function fail(req, res){
  respond('auth_failed', null, res);
}

//everything but redis methods
function auth_params(req, res, next){
  console.log('authing params');
  next();
};

function parse_basic_auth(header){
  console.log(header);
  token = header.split(/\s+/).pop() ||'', // and the encoded auth token
  auth = new Buffer(token, 'base64').toString(); // convert from base64
  parts = auth.split(/:/); // split on colon
  return {
    username : parts[0],
    password : parts[1]
  };
};

//check the xyz combo
function auth_header(req, res, next){
  var basic_auth = parse_basic_auth(req.headers.authorization || '');
  req.username = basic_auth.username;
  req.password = basic_auth.password;

  console.log('u:', req.username, 'p:', req.password);

  if (req.username && req.password){
    console.log('auth successful');
    return next();
  } else {
    fail(req, res);
  }
};

module.exports = [ auth_header, auth_params];
