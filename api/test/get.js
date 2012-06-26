var get = require('./lib/_get.js');

var data = {
  args : ['foo']
};

get('/get', data, function(){
  console.log(arguments);
});
