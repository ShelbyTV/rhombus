(function(){

  window.libs.views.login = Backbone.View.extend({

    className : 'login-view-container',

    events : {
      "click .login-button" : "_onLoginButtonClick"

    },

    initialize : function(){
    },

    _onLoginButtonClick : function(){
      this.$('.login-button').html('<img src="./images/11.gif" />');
      this.$('.login-wait-msg').slideToggle();
      var e = this.$('.email-input').val();
      var p = this.$('.pwd-input').val();
      window.utils.client._request('login', {email:e,pwd:p}, function(){
        console.log(arguments);
      }, true);
    },

    template : function(){
      var t =  $('#login-template').html();
      return t;
    },

    render : function(){
      this.$el.html($(_.template(this.template(), {})));
      return this;
    }

  });
})();
