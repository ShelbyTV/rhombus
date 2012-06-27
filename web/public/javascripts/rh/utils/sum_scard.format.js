(function(){
  window.utils.sum_scard_format = function(data){
    var sum = 0;
    Object.keys(data).forEach(function(key){
      sum += data[key];
    });
    return sum;
  }

})();
