const db = require("../db/clients")

function getClients(req,res){
  //unique user id from AzureAD
  //should be used from client queries
  const {oid} = req.user
  const clients = db.getClients(oid)
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