var post = require('./lib/_post.js');

var data = {
  args : ['foo', 'bar']
};

var incrby_data = {
  args : ['bar', 1]
};

post('/set', data, function(data){
  console.log(data);
});

post('/incrby', incrby_data, function(data){
  console.log(data);
});
