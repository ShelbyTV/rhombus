module.exports = function(req, res, next){
  console.log('CORS', req.headers.origin);
  //var allowedOrigin = process.env.NODE_ENV === 'development' ? 'http://localhost.shelby.tv:3000' : 'http://gt.shelby.tv';
  //res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-CSRF-Token');
  next();
};
