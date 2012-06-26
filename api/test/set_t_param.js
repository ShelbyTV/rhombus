var post = require('./lib/_post.js');
var get = require('./lib/_get.js');

var set_data = {          //h  m  s   ms
  t : new Date().getTime()-(5*60*60*1000),
  args : ['foo', 'bar']
};

var get_data = {
  args : ['foo'],
  limit: 24
};

post('/set', set_data, function(data){
  get('/get', get_data, function(data){
    console.log(data);
  });
});
