(function(){
  
  window.utils.active_web_format = function(data){
    var out = [];
    Object.keys(data).forEach(function(key){
      out.push([key/1, data[key]]); 
    });
    return out;
  }

})();
