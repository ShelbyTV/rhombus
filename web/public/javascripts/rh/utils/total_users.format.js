(function(){

  var shift = utils.time_shift;
  
  function in_millions(num){
    return num; 
  };

  window.utils.total_users_format = function(data){
    var out = [];
    Object.keys(data).forEach(function(ts){
      out.push([shift(ts/1), in_millions(data[ts])]);
    });
    return out;
  }

})();
