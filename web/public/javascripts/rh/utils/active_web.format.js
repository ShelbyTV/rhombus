(function(){

  var shift = utils.time_shift; 
  var floor_midnight = utils.floor_midnight;

  function condense(data, reduce_key){
    var condensed = {};
    Object.keys(data).forEach(function(key){
      var _key = reduce_key(key);
      condensed[_key] = condensed.hasOwnProperty(_key) ? condensed[_key]+data[key] : data[key];
    });
    return condensed;
  }

  window.utils.active_web_format = function(data){
    data = condense(data, floor_midnight);
    var out = [];

    Object.keys(data).forEach(function(key){
      //out.push([shift(key/1), data[key]]); 
      out.push([key/1, data[key]]); 
    });

    return out;
  }

})();
