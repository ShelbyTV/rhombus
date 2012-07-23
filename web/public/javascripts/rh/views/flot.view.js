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
      this._bind_model_changes();
    },

    render : function(){
      this.$el.html($(_.template(this.template(), {title : this._get_title(), period : this._get_period()})));
      $('body').append(this.$el);
      this.plot();
      this._make_draggable();
      this._make_droppable();
    },

    plot : function(){
      this.$('.flot-view').html('');
      $.plot(this.$('.flot-view'), this._get_dataseries(), this.flot_options);
    },

    _bind_model_changes : function(){
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

    _make_droppable : function(){
      var self = this;
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

    _make_draggable : function(){
      var self = this;
      this.$el.draggable({
        start : function(){
          window.app_model.set('last_dragged_view', self);
        }
      });
    },

    _render_title : function(title){
      this.$('.flot-view-title').html(title);
    },

    _get_period : function(){
      return this.options.models[0].get('period') || '1 week';
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

    _weeks_to_hrs : {
      '1 week' : 7*24,
      '2 weeks' : 2*7*24,
      '1 month' : 4*7*24
    },

    _on_time_selector_change : function(event){
      var period = $(event.srcElement).val();
      var hrs = this._weeks_to_hrs[period];
      this.options.models.forEach(function(model){
        model.set('period', period);
        model.load({cmd:model.get('last_load'), limit:hrs});
      });
    }

  });

})();
