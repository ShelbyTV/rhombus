(function(){
  var d = 4*60*60*1000; //4 hours
  window.utils.time_shift = function(ts){
    return ts-d;
  };
})();
