
const db = require("../db/article")

function getArticle(req,res){
  //extract client id
  const {cid,aid} = req.params
  //get page and rowsPerPage query params
  
  const payload = db.getArticle(cid,aid)

  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload
  });
}

module.exports = {
  getArticle
}