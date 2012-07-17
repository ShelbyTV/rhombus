(function(){

  window.libs.routers.app = Backbone.Router.extend({

    routes : {
      "" : "init",
      "login" : "init_login",
      "cohorts/:cohort/actions" : "init_actions",
      "cohorts/:cohort/dashboard" : "init_dashboard",
      "cohorts/:cohort/actives" : "init_actives",
      "cohort_comparison" : "init_cohort_comparison",
      "cohorts/:cohort/user_numbers" : "init_user_numbers",
      "user_numbers" : "init_user_numbers"
    },

    _clear : function(){
      Object.keys(alive.views).forEach(function(key){
        alive.views[key].remove();
        delete alive.views[key];
      });
      window.navbar && window.navbar.remove();
    },

    auth : function(){
      if (sessionStorage.rhombus_token){
        return true;
      }  else {
        this.navigate('login', {trigger:true});
        return false;
      }
    },

    init : function(cohort, active_tab){
      if(this.auth()) {
        var self = this;
        if (!window.app_model){ //bind stuff
          this._init_app_model();
          window.app_model.set({cohort:cohort||'all', active_tab:active_tab||'dashboard'});
        }
        return true;
      } else {
        return false;
      }
    },

    _init_app_model : function(){
      var self = this;
      window.app_model = new libs.models.app();
      window.app_model.bind('change', function(app){
        self.navigate('cohorts/'+app.get('cohort')+'/'+app.get('active_tab'), {trigger:true}); 
      });
    },

    init_login : function(){
      this._clear();
      this._init_app_model();
      alive.views.login = new libs.views.login();
      var html = alive.views.login.render().$el;
      $('body').append(html);
    },

    init_navbar : function(opts){
      window.navbar = new libs.views.navbar(opts);
      $('body').append(window.navbar.render().$el);
    },

    init_cohort_comparison : function(cohort){
      if (!this.init('all', 'cohort_comparison')) return false;
      this._clear();
      this.init_navbar({active_tab:'cohort_comparison'});

      var self = this;
      ['reece_ux_1','dan_ux_1','henry_ux_1','myles','chris_ux_1','mark_ux_1'
      , 'lauren_ux_1','josh_ux_1','vincent_ux_1','mike_ux_1','arthur_ux_1'
      , 'jeng_ux_1','frasher_ux_1'].forEach(function(cohort){
        self._init_cohort_wau(cohort);  
      });
    },

    _init_cohort_wau : function(cohort){
      var key = 'active_web';

      window.wau_model = new libs.models.set({key:key, cohort:cohort, format:utils.union_smembers_format});
      alive.views[cohort+'_wau'] = new libs.views.numerical({ model:wau_model, title: [cohort]});
      window.wau_model.smembers({limit:24*7});
    },

    init_actives : function(cohort){
      if (!this.init(cohort, 'actives')) return false;
      this._clear();
      this.init_navbar({active_tab:'actives', cohort:cohort});

      var key = 'active_web';

      //window.dau_model = new libs.models.set({key:key, format:utils.union_smembers_format});
      window.dau_model = new libs.models.set({key:key, format:utils.union_smembers_format});
      window.wau_model = new libs.models.set({key:key, format:utils.union_smembers_format});
      window.mau_model = new libs.models.set({key:key, format:utils.union_smembers_format});

      alive.views['dau'] = new libs.views.numerical({ model:dau_model, title: ['Daily']});
      alive.views['wau'] = new libs.views.numerical({ model:wau_model, title: ['Weekly']});
      alive.views['mau'] = new libs.views.numerical({ model:mau_model, title: ['Monthly']});

      window.dau_model.smembers({limit:24});
      window.wau_model.smembers({limit:24*7});
      window.mau_model.smembers({limit:24*7*4});
    },

    init_dashboard : function(cohort){
      if (!this.init(cohort, 'dashboard')) return false;
      this._clear();
      this.init_navbar({active_tab:'dashboard', cohort:cohort});

      // active users (set -> scard)
      window.active_web_model = new libs.models.set({key:'active_web', format:utils.memcard_format});
      alive.views['active_web'] = new libs.views.bar({models:[active_web_model], title:'Active Users'});
      window.active_web_model.smembers();

      // session length (hash -> avg)
      window.session_length_model = new libs.models.hash({key:'session_length', format:utils.session_length_format});
      alive.views['session_length'] = new libs.views.bar({models:[session_length_model], title:'Avg. Session Length (in minutes)'});
      window.session_length_model.hgetall();

      this._position_views();
    },

    init_actions : function(cohort){
      if (!this.init(cohort, 'actions')) return false;
      this._clear();
      this.init_navbar({active_tab:'actions', cohort:cohort});

      // videos watched (set scard)
      window.videos_watched_model = new libs.models.set({key:'videos_watched', format:utils.memcard_format});
      alive.views['videos_watched'] = new libs.views.bar({models:[videos_watched_model], title:'Videos Watched'});
      window.videos_watched_model.smembers();

      // videos rolled (set -> scard)
      window.frames_rolled_model = new libs.models.set({key:'frames_rolled', format:utils.memcard_format});
      alive.views['frames_rolled'] = new libs.views.bar({models:[frames_rolled_model], title:'Videos Rolled'});
      window.frames_rolled_model.smembers();

      // videos upvoted (set -> scard)
      window.frames_upvoted_model = new libs.models.set({key:'frames_upvoted', format:utils.memcard_format});
      alive.views['frames_upvoted'] = new libs.views.bar({models:[frames_upvoted_model], title:'Videos Upvoted'});
      window.frames_upvoted_model.smembers();

      // videos commented on (set -> scard)
      window.frames_commented_model = new libs.models.set({key:'comments', format:utils.memcard_format});
      alive.views['frames_commented'] = new libs.views.bar({models:[frames_commented_model], title:'Videos Commented On'});
      window.frames_commented_model.smembers();

      // videos shared (set -> scard)
      window.frames_shared_model = new libs.models.set({key:'shares', format:utils.memcard_format});
      alive.views['frames_shared'] = new libs.views.bar({models:[frames_shared_model], title:'Videos Shared'});
      window.frames_shared_model.smembers();

      this._position_views();
    },

    init_user_numbers : function(cohort){
      if (!this.init()) return false;
      this._clear();
      this.init_navbar({cohort:cohort, active_tab:'user_numbers'});

      // total real users (int)
      window.total_real_users_model = new libs.models.int({key:'total_real_users', format:utils.total_users_format});
      alive.views['total_real_users'] = new libs.views.line({models:[total_real_users_model], title:'Real Users'});
      window.total_real_users_model._get();

      // total users (int)
      window.total_users_model = new libs.models.int({key:'total_users', format:utils.total_users_format});
      alive.views['total_users'] = new libs.views.line({models:[total_users_model], title:'Total "Data" Users'});
      window.total_users_model._get();

      this._position_views();
    },

    _position_views : function(){
      setTimeout(function(){
        //2 per row
        Object.keys(alive.views).forEach(function(key, i){
          var left = ((i%2)*610); //even numbs (and 0) will be zero odd will be 1
          var top = ((Math.floor(i/2))*310); 
          var view = alive.views[key];
          view.$el.css({top:(top+40)+'px', left:left});
        });
      }, 0);
    }

  });

})();
