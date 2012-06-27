(function(){

  window.libs.routers.app = Backbone.Router.extend({

    routes : {
      "" : "init",
      "login" : "init_login",
      "dashboard" : "init_dashboard",
      "navigator" : "init_navigator"
    },

    _clear : function(){
      console.log('clearing', Object.keys(alive.views));
      Object.keys(alive.views).forEach(function(key){
        alive.views[key].remove();
        delete alive.views[key];
      });
    },

    auth : function(){
      console.log('in auth');
      if (sessionStorage.rhombus_token){
        console.log('authed');
        return true;
      }  else {
        this.navigate('login', {trigger:true});
      }
    },

    init : function(url){
      console.log('in init');
      this.auth() && this.navigate('dashboard');
    },

    init_login : function(){
      console.log('in init_login');
      this._clear();
      alive.views.login = new libs.views.login();
      var html = alive.views.login.render().$el;
      $('body').append(html);
    },

    init_navigator : function(){

    },

    init_dashboard : function(){
      console.log('in init dboard');

      if (!this.auth()) return false;

      this._clear();

      console.log('initting dashboard');

      // active users (set -> scard)
      window.active_web_model = new libs.models.set({key:'active_web', format:utils.active_web_format});
      alive.views['active_web'] = new libs.views.bar({models:[active_web_model], title:'Active Users'});
      window.active_web_model.scard();

      // session length (hash -> avg)
      window.session_length_model = new libs.models.hash({key:'session_length', format:utils.session_length_format});
      alive.views['session_length'] = new libs.views.bar({models:[session_length_model], title:'Avg. Session Length (in seconds)'});
      window.session_length_model.hgetall();

      // videos watched (set scard)
      window.videos_watched_model = new libs.models.set({key:'videos_watched', format:utils.active_web_format});
      alive.views['videos_watched'] = new libs.views.bar({models:[videos_watched_model], title:'Videos Watched'});
      window.videos_watched_model.scard();

      // videos rolled (set -> scard)
      window.frames_rolled_model = new libs.models.set({key:'frames_rolled', format:utils.active_web_format});
      alive.views['frames_rolled'] = new libs.views.bar({models:[frames_rolled_model], title:'Videos Rolled'});
      window.frames_rolled_model.scard();

      // videos rolled (set -> scard)
      window.frames_upvoted_model = new libs.models.set({key:'frames_upvoted', format:utils.active_web_format});
      alive.views['frames_upvoted'] = new libs.views.bar({models:[frames_upvoted_model], title:'Videos Upvoted'});
      window.frames_upvoted_model.scard();

      // total real users (int)
      window.total_real_users_model = new libs.models.int({key:'total_real_users', format:utils.total_users_format});
      alive.views['total_real_users'] = new libs.views.line({models:[total_real_users_model], title:'Real Users'});
      window.total_real_users_model._get();

      // total users (int)
      window.total_users_model = new libs.models.int({key:'total_users', format:utils.total_users_format});
      alive.views['total_users'] = new libs.views.line({models:[total_users_model], title:'Total "Data" Users'});
      window.total_users_model._get();

      // total faux users (int)
      /*window.total_faux_users_model = new libs.models.int({key:'total_faux_users', format:utils.total_users_format});
      alive.views['total_faux_users'] = new libs.views.line({models:[total_faux_users_model], title:'Total "Faux" Users'});
      window.total_faux_users_model._get();*/
      
      

      

      // logins (set -> scard)
      /*window.web_logins_model = new libs.models.set({key:'web_logins', format:utils.active_web_format});
      window.web_longins_view = new libs.views.bar({models:[web_logins_model], title:'Web Logins'});
      window.web_logins_model.scard();*/

      

      setTimeout(function(){
        //2 per row
        Object.keys(alive.views).forEach(function(key, i){
          var left = ((i%2)*610); //even numbs (and 0) will be zero odd will be 1
          var top = ((Math.floor(i/2))*310); 
          console.log(i, left, top, key);
          var view = alive.views[key];
          view.$el.css({top:top+'px', left:left});
        });
      }, 0);
    }

  });

})();
