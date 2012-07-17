(function(){

  var floor = utils.floor_midnight;

  window.utils.union_smembers_format = function(data){

    var out = [];

    Object.keys(data).forEach(function(ts){
      out = _.union(out, data[ts]);
    });
    
    return out.length;
  }

})();
