(function(){
  /*
   * at every ts is a obj 
   * each obj maps user id to session length 
   * take the avg
   */

  function get_map_numerical_avg(map){
    if (!map) return 0;
    var count = 0
    , sum = 0;
    Object.keys(map).forEach(function(key){
      sum+=map[key]/1;
      count+=1;
    });
    return(Math.ceil(sum/count));
  };

  function ms_to_mins(ms){
    return ms/1000/60;
  };

  window.utils.session_length_format = function(data){
    var out = [];
    Object.keys(data).forEach(function(ts){
      out.push([ts/1, ms_to_mins(get_map_numerical_avg(data[ts]))]);
    });
    return out;
  }

})();
