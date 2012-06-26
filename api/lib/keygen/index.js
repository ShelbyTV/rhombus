var INTERVALS = {
  hourly : 60*60*1000,
  daily : 24*60*60*1000
};
var DELIM = ':';

var KEYGEN = {

  _get_timestamp : function(interval, skip, t){
    if (t) return t - (t % interval);
    var now = skip ? new Date().getTime() - (skip*interval) : new Date().getTime();
    return now - (now % interval);
  },

  _get_assembled : function(user_id, ts, key){
    return user_id+DELIM+ts+DELIM+key;
  },

  //
  // opts { user_id, key, skip, t }
  //

  get_hourly : function(options){
    return this._get_assembled(options.user_id, this._get_timestamp(INTERVALS.hourly, options.skip, options.t), options.key);
  },

  get_daily : function(options){
    return this._get_assembled(options.user_id, this._get_timestamp(INTERVALS.hourly, options.skip, options.t), options.key);
  }

};

module.exports = KEYGEN;
