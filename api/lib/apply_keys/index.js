//  methods;
var map = require('./map.js');
var array = require('./array.js');
var parse_timestamps = require('./parse_timestamps.js');

// current method
var apply_keys = map;

module.exports = function(keys, values){
  if (!keys.length || !values.length) return false;
  keys = parse_timestamps(keys);
  return apply_keys(keys, values);
};
