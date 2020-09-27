
module.exports = function(req,res){
  // console.log("req:", req)
  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload:{
      baseUrl: req.baseUrl,
      headers: req.headers,
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body
    }
  });
}