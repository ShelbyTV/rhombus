(function(){

  window.libs.views.flot = Backbone.View.extend({

    className : 'flot-view-container',

    events : {
      'change .time-selector' : '_on_time_selector_change'
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
            loaded=0;
            self.render();
          }
        });
      });
    },

    render : function(){
      this.$el.html($(_.template(this.template(), {title : this._get_title()})));
      $('body').append(this.$el);
      this.plot();
      var self = this;
      this.$el.draggable({
        start : function(){
          window.app_model.set('last_dragged_view', self);
        }
      });
      this.$el.droppable({
        hoverClass : 'flot-drop-hover',
        drop : function(){
          self.options.models = _.union(window.app_model.get('last_dragged_view').options.models, self.options.models);
          window.app_model.get('last_dragged_view').remove();
          self.plot();
          self._render_title(self._get_title(true));
        }
      });
    },

    plot : function(){
      this.$('.flot-view').html('');
      $.plot(this.$('.flot-view'), this._get_dataseries(), this.flot_options);
    },

    _render_title : function(title){
      this.$('.flot-view-title').html(title);
    },

    _get_title : function(force_compute){
      var keys = [];
      this.options.models.forEach(function(model){
        keys.push(model.get('key'));
      });
      return force_compute ? keys.join(' v ') : this.options.title;
    },

    _get_dataseries : function(){
      var series = [];
      this.options.models.forEach(function(model){
        series.push(model.get('data'));
      });
      return series;
    },

    _mappy_thing : {
      '1 week' : 7*24,
      '2 weeks' : 2*7*24,
      '1 month' : 4*7*24
    },

    _on_time_selector_change : function(event){
      var period = $(event.srcElement).val();
      console.log('change', period);
      var hrs = this._mappy_thing[period];
      console.log('hrs', hrs);
      this.options.models.forEach(function(model){
        //console.log(model);
        //model.smembers({limit:hrs});
        //console.log(model.get('last_load'));
        model.load({cmd:model.get('last_load'), limit:hrs});
      });
    }

  });

})();
