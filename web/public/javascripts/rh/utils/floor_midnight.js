(function(){
  var d = 24*60*60*1000; //4 hours
  window.utils.floor_midnight = function(ts){
    //return the floor midnight of this timstamp
    return ts-(ts%d);
  };
})();
