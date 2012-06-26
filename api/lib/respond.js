module.exports =  function(e, r, res){
  res.end(JSON.stringify({error:e, data:r}));
};
