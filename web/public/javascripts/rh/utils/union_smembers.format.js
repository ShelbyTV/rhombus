(function(){

  window.utils.union_smembers_format = function(data){

    var out = [];

    Object.keys(data).forEach(function(key){
      if (data[key].length){
        out = _.union(out, data[key]);
      }
    });
    
    return out.length;
  }

})();
