var post = require('./lib/_post.js');

var set_data = {
  args : ['foo', 'bar']
};

var incrby_data = {
  args : ['bar', 1]
};

var sadd_data = {
  args : ['set1', 'member1']
};

var hset_data = {
  args : ['hash1', 'key1', 'val1']
};

post('/set', set_data, function(data){
  console.log(data);
});

post('/incrby', incrby_data, function(data){
  console.log(data);
});

post('/sadd', sadd_data, function(data){
  console.log(data);
});

post('/hset', hset_data, function(data){
  console.log(data);
});
