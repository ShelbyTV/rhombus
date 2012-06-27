(function(){

  window.libs.views.flot = Backbone.View.extend({

    className : 'flot-view-container',

    events : {
      "mouseup" : "_onMouseUp"
    },

    template : function(){
      var t = $('#flot-template').html();
      return t;
    },

    initialize : function(){
      var self = this;
      var loaded = 0;
      this.options.models.forEach(function(model){
        model.bind('change:data', function(){
          loaded+=1;
          if (loaded===self.options.models.length){
            self.render();
          }
        });
      });
    },

    render : function(){
      this.$el.html($(_.template(this.template(), {title : this._get_title()})));
      $('body').append(this.$el);
      //var css = JSON.parse(localStorage._rhombus_state)[this.options.models[0].get('key')];
      //this.$el.css(css);
      this.plot();
      /*this.$el.draggable();
      this._initResizePolling();*/
    },

    _onMouseUp : function(){
      if (this.should_resize){
        this.plot();
        this.should_resize = false;
      }
    },

    _initResizePolling : function(){
      var self = this;
      var state = {};
      setInterval(function(){

        if (!Object.keys(state).length){
          state.width = self.$el.width();
          state.height = self.$el.height();
          return;
        }

        if (state.width!==self.$el.width() || state.height!==self.$el.height()){
          //self.$el.css({width:100,height:100});
          self.should_resize = true;
        }

        state.width = self.$el.width();
        state.height = self.$el.height();

      }, 10);
    },

    plot : function(){
      this.$('.flot-view').html('');
      $.plot(this.$('.flot-view'), this._get_dataseries(), this.flot_options);
    },

    _get_title : function(){
      var keys = [];
      this.options.models.forEach(function(model){
        keys.push(model.get('key'));
      });
      return this.options.title || keys.join(' ');
    },

    _get_dataseries : function(){
      var series = [];
      this.options.models.forEach(function(model){
        series.push(model.get('data'));
      });
      return series;
    },

  });

})();
