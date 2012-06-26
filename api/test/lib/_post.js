var http = require('http')
, querystring = require('querystring');

module.exports = function(path, data, cb){
  //var data = querystring.stringify(data);
  var data = JSON.stringify(data);

  var opts = {
    host : 'localhost', 
    port : 3010,
    path : path,
    method : 'POST',
    auth : 'test:test',
    headers : {
      'Content-Type' : 'application/json',
      'Content-Length' : data.length
    }
  };

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

  req.write(data);
  req.end();
};
