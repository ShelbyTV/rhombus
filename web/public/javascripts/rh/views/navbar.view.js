(function(){

  window.libs.views.navbar = Backbone.View.extend({

    className : 'navbar-view-container',

    events : {
      "click .dboard" : "_onDashboardClick",
      "click .active-users" : "_onActiveUsersClick",
      "click .cohort-comparison" : "_onCohortComparisonClick",
      "click .user-numbers" : "_onUserNumbersClick",
      "click .actions" : "_onActionsClick",
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
      window.app_model.get('cohort') && this.$('.'+window.app_model.get('cohort')+'-cohort-opt').attr('selected', 'selected');
    },

    _onCohortSelectorChange : function(event){
      var cohort = $(event.srcElement).val();
      window.app_model.set({cohort:cohort});
    },

    _onActiveUsersClick : function(){
      window.app_model.set('active_tab', 'actives');
    },

    _onCohortComparisonClick : function(){
      //suppress event here and navigate
      window.app_model.set('active_tab', 'cohort_comparison', {silent:true});
      window.alive.routers.app.navigate('cohort_comparison', {trigger:true});
    },

    _onUserNumbersClick : function(){
      //suppress event here and navigate
      window.app_model.set('active_tab', 'user_numbers', {silent:true});
      window.alive.routers.app.navigate('user_numbers', {trigger:true});
    },

    _onDashboardClick : function(){
      window.app_model.set('active_tab','dashboard');
      //window.alive.routers.app.navigate('dashboard', {trigger:true});
    },

    _onActionsClick : function(){
      window.app_model.set('active_tab','actions');
    }

  });
})();
