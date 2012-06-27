(function(){
  /*
   * at every ts is a obj 
   * each obj maps user id to session length 
   * take the avg
   */
  
  var shift = utils.time_shift;

  function get_map_numerical_median(map){
    if (!map) return 0;
    var vals = [];
    Object.keys(map).forEach(function(key){
      vals.push(map[key]/1);
    });
    /*_.sortBy(vals, function(num){
      return num;
    });*/
    vals.sort(function(a,b){return a-b});
    return vals[Math.floor(vals.length/2)];
  };

  function ms_to_mins(ms){
    return ms/1000/60;
  };

  window.utils.hash_median_format = function(data){
    var out = [];
    Object.keys(data).forEach(function(ts){
      out.push([shift(ts/1), ms_to_mins(get_map_numerical_median(data[ts]))]);
    });
    return out;
  }

})();
