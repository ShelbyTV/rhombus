module.exports = {
  set : {
    set : 'int',
    sadd : 'set,
    incrby : 'int',
    hset : 'hash',
    lpush : 'list'
  },
  get : {
    get : 'int',
    smembers : 'set',
    scard : 'int',
    sismember : 'boolean',
    hget : 'hash',
    hgetall : 'hash',
    hmget : 'hash'
  }
};
