(function(){

  var shift = utils.time_shift; 
  var floor_day = utils.floor_midnight;

  window.utils.memcard_format = function(data){
    var map = {};
    var out = [];

    Object.keys(data).forEach(function(tshr){
      var tsday = floor_day(tshr);
      map[tsday] = map.hasOwnProperty(tsday) ? _.union(map[tsday], data[tshr]) : data[tshr];
    });

    console.log(map);

    Object.keys(map).forEach(function(ts){
      out.push([ts/1, _.compact(map[ts]).length]); 
    });

    return out;
  }

})();
