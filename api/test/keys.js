var get = require('./lib/_get.js');

var data = {
  args : ['foo']
};

/*
 * Currently get is returning 24 hours into the future
 */
get('/get', data, function(res){
  Object.keys(res.data).forEach(function(key){
    console.log(new Date(key/1));
  });
});
