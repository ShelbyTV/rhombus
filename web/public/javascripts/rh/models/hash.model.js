(function(){
  window.libs.models.hash = libs.models.base.extend({
    defaults : {
      commands : ['hgetall', 'hget']
    }
  });
})();
