module.exports = function(keys, values){
  var map = {};
  keys.forEach(function(key, i){
    map[key] = values[i];
  });
  return map;
};
