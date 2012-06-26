(function(){
  window.libs.models.set = libs.models.base.extend({
    defaults : {
      commands : ['smembers', 'scard']
    }
  });

})();
