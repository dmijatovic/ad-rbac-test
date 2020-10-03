const clint={
  "cid":"234234",
  "name":"First client name",
  "articles":{
    "todo":13,
    "completed":7
  },
  "lastLogin":"2020-09-29"
}


function getClient(req,res){
  const {cid} = req.params
  //change cid to required one
  // test check
  client.cid = cid
  //return dummy data for now
  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload:client
  });
}

module.exports = {
  getClient
}