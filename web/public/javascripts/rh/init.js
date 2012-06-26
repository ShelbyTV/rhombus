(function(){

  _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
  };

  window.utils = {};

  window.alive = {
    views : {},
    routers : {}
  };

  window.libs = {
    routers : {},
    models : {},
    views : {}
  };

})();

