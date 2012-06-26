var http = require('http')
, querystring = require('querystring');

module.exports = function(path, data, cb){

  var opts = {
    host : 'localhost', 
    port : 3010,
    path : path+'?'+querystring.stringify(data),
    method : 'GET',
    auth : 'test:test'
  };

  console.log(opts.path);

  var req = http.request(opts, function(res){
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function(d){
      data+=d;
    });
    res.on('end', function(){
      return cb(JSON.parse(data));
    });
  });

  req.end();
};
