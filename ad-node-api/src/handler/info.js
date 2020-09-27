module.exports = function(req,res){
  // console.log("req:", req)
  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload:{
      apiName:"Publistat coding api",
      apiVersion: "0.0.1",
      apiStatus: "Live (otherwise you won't get response)"
    }
  });
}