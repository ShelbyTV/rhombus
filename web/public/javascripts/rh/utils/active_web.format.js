(function(){
  var shift = utils.time_shift; 
  window.utils.active_web_format = function(data){
    var out = [];
    Object.keys(data).forEach(function(key){
      out.push([shift(key/1), data[key]]); 
    });
    return out;
  }

})();
