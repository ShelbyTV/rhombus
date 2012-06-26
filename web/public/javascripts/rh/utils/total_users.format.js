(function(){
  
  function in_millions(num){
    return num; 
  };

  window.utils.total_users_format = function(data){
    var out = [];
    Object.keys(data).forEach(function(ts){
      out.push([ts/1, in_millions(data[ts])]);
    });
    return out;
  }

})();
