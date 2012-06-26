(function(){

  window.utils.client = {

    _auth_token : null,

    _env_api_root_map : {
      "production" : 'http://api.rhombus.shelby.tv',
      "development" : 'http://localhost.shelby.tv:3010'
    },

    _get_api_root : function(){
      return this._env_api_root_map['production'];
    }, 

    _request : function(cmd, data, cb, no_auth){
      var self = this;
      var opts = {
        type : 'GET',
        url : this._get_api_root()+'/'+cmd,
        data : data,
        beforeSend : function(xhr, settings){
          if (no_auth) return;
          xhr.setRequestHeader('Authorization', sessionStorage.rhombus_token);
        },
        error : function(data){
          console.log("couldn't contact local rhombus API .. not a big deal", arguments);
          return cb(data);
        },
        success : function(data){
          return cb(data);
        }
      };

      jQuery.ajax(opts);
    }

  };
})();
