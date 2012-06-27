(function(){

  window.libs.views.numerical = Backbone.View.extend({

    className : 'numerical-view-container',

    events : {
    },

    template : function(){
      var t = $('#numerical-template').html();
      return t;
    },

    initialize : function(){
      var self = this;
      var loaded = 0;
      this.model.bind('change:data', this.render, this);
    },

    render : function(){
      this.$el.html($(_.template(this.template(), {data:this.model.get('data'), title:this.options.title})));
      $('body').append(this.$el);
    }

  });

})();
