(function(){
  /*
   * at every ts is a obj 
   * each obj maps user id to session length 
   * take the avg
   */
  var shift = utils.time_shift;
  var floor_day = utils.floor_midnight;

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

  function array_avg(a){
    var sum = 0;
    a.forEach(function(val){
      sum+=(val/1);
    });
    return sum/a.length;
  };


  window.utils.session_length_format = function(data){
    var out = [];
    var map = {};
    
    // map of tsdays to array of s lens
    Object.keys(data).forEach(function(tshr){
      var tsday = floor_day(tshr);
      map[tsday] = map.hasOwnProperty(tsday) ? map[tsday].concat(_.values(data[tshr])) : _.values(data[tshr]);
    });

    // rewrite arrays as avg val of arrays
    Object.keys(map).forEach(function(tsday){
      map[tsday] = array_avg(map[tsday]);
    });

    Object.keys(map).forEach(function(ts){
      //out.push([shift(ts/1), ms_to_mins(get_map_numerical_avg(data[ts]))]);
      //out.push([ts/1, ms_to_mins(get_map_numerical_avg(data[ts]))]);
      out.push([ts/1, ms_to_mins(map[ts])]);
    });

    return out;
  }

})();
