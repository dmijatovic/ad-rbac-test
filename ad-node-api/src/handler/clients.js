const clients=[{
  "cid":"234234",
  "name":"First client name",
  "articles":{
    "todo":13,
    "completed":7
  },
  "lastLogin":"2020-09-29"
},{
  "cid":"234235",
  "name":"Second client name",
  "articles":{
    "todo":7,
    "completed":7
  },
  "lastLogin":"2020-09-29"
},{
  "cid":"234236",
  "name":"Third client name",
  "articles":{
    "todo":3,
    "completed":7
  },
  "lastLogin":"2020-09-29"
}]

function getClients(req,res){
  //unique user id from AzureAD
  //should be used from client queries
  const {oid} = req.user

  //return dummy data for now
  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload: clients
  });
}

module.exports = {
  getClients
}