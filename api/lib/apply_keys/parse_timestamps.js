module.exports = function(keys){
  return keys.map(function(key){
    return key.split(':')[1];
  });
}
