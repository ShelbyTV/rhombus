(function(){

  window.libs.views.navbar = Backbone.View.extend({

    className : 'navbar-view-container',

    events : {
      "click .dboard" : "_onDashboardClick",
      "click .active-users" : "_onActiveUsersClick",
      "change .cohort-selector" : "_onCohortSelectorChange"
    },

    initialize : function(){
    },

    template : function(){
      return $('#navbar-template').html();
    },

    render : function(){
      this.$el.html($(_.template(this.template(), this.options)));
      this._selectCohort();
      return this;
    },

    _selectCohort : function(){
      this.options.cohort && this.$('.'+this.options.cohort+'-cohort-opt').attr('selected', 'selected');
    },

    _onCohortSelectorChange : function(event){
      var cohort = $(event.srcElement).val();
      var url = cohort === 'all' ? '/dashboard' : '/cohorts/'+cohort;
      window.alive.routers.app.navigate(url, {trigger:true});
    },

    _onActiveUsersClick : function(){
      window.alive.routers.app.navigate('actives', {trigger:true});
    },

    _onDashboardClick : function(){
      window.alive.routers.app.navigate('dashboard', {trigger:true});
    }

  });
})();
