(function(){
  window.libs.models.base = Backbone.Model.extend({

    initialize : function(){
      var self = this;
      this.get('commands').forEach(function(cmd){
        self[cmd] = function(opts){
          opts = opts || {};
          opts.cmd = cmd.replace('_','');
          self.load(opts);
        }
      });
    },

    load : function(opts){
      var self = this;
      utils.client._request(opts.cmd, {
        skip : opts.skip || 0,
        limit : opts.limit || 24,
        args : [this.get('key')]
      }, function(res){
        //try { 
          res = JSON.parse(res)
          if (res.error || !res.data) return alert('something went wrong');
          self.set({data:self.get('format')(res.data)});
        //} catch (e){
         // console.log(res);
          //console.log(e.message);
        //}
      });
    }

  });
})();
