var post = require('../test/lib/_post.js');
var get = require('../test/lib/_get.js');

// edit these //
var set_cmd = 'hset';
var get_cmd = 'hgetall';
var key = 'session_length';
var limit = 72;
//////////////

function r_post(reqs, cb){
  if (!reqs.length) return cb();
  var req = reqs.shift();
  console.log(new Date(req.t), req.args[1]);
  post('/'+set_cmd, req, function(){
    r_post(reqs, cb);
  });
};

var hours = limit 
, reqs = []
, get_data = {
  limit : limit,
  args : [key]
};

for (var h = 0; h < hours; h++){
  var u = Math.ceil(Math.random()*100);
  for (var i = 0; i < u; i++){//do this i times for the given hour
    reqs.push({
      t : new Date().getTime()-(h*60*60*1000),
      args : [key, Math.ceil(Math.random()*100), Math.ceil(Math.random()*1000)]
    });
  }
}

r_post(reqs, function(data){
  get('/'+get_cmd, get_data, function(res){
    Object.keys(res.data).forEach(function(ts){
      console.log(new Date(ts/1)+':', res.data[ts]);
    });
  });
});
