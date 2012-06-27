(function(){
  window.utils.union_smembers_format = function(data){
    var out = [];
    Object.keys(data).forEach(function(key){
      out = _.union(out, data[key]);
    });
    return out.length;
  }

})();
