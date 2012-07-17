(function(){
  /*
   * at every ts is a obj 
   * each obj maps user id to session length 
   * take the avg
   */
  var shift = utils.time_shift;
  var floor_midnight = utils.floor_midnight;

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

  function condense(data, reduce_key){
    var condensed = {};
    Object.keys(data).forEach(function(key){
      var _key = reduce_key(key);
    });

  };

  window.utils.session_length_format = function(data){
    var out = [];

    //data = condense(data, floor_midnight);

    Object.keys(data).forEach(function(ts){
      //out.push([shift(ts/1), ms_to_mins(get_map_numerical_avg(data[ts]))]);
      out.push([ts/1, ms_to_mins(get_map_numerical_avg(data[ts]))]);
    });

    return out;
  }

})();
