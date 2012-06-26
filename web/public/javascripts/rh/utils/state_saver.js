(function(){

  $(document).ready(setInterval(function(){
    var state = {};
    Object.keys(alive.views).forEach(function(key){
      var view = alive.views[key];
      state[key] = {
        top : view.$el.position().top,
        left : view.$el.position().left,
        width : view.$el.width(),
        height: view.$el.height()
      };
    });
    localStorage._rhombus_state = JSON.stringify(state);
  }, 1000));

})();
