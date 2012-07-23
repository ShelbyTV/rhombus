(function(){
  window.libs.models.base = Backbone.Model.extend({

    initialize : function(){
      this._apply_commands() ;
    },

    _apply_commands : function(){
      var self = this;
      this.get('commands').forEach(function(cmd){
        self[cmd] = function(opts){
          opts = opts || {};
          opts.cmd = cmd.replace('_',''); //this allows for _get
          self.load(opts);
        }
      });
    },

    load : function(opts){
      var self = this;
      var cohort = this.get('cohort') ? ':'+this.get('cohort') : window.app_model.get('cohort')==='all' ? '' : ':'+window.app_model.get('cohort');
      var key = this.get('key')+cohort;
      utils.client._request(opts.cmd, {
        skip : opts.skip || 0,
        limit : opts.limit || 168,
        args : [key]
      }, function(res){
        res = JSON.parse(res)
        if (res.error || !res.data) return console.log(res.error);
        self.set('last_load', opts.cmd);
        self.set({data:self.get('format')(res.data)});
      });
    }

  });
})();
