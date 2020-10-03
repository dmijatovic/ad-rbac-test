
const {getPayload} = require("../db/articles")

function getArticles(req,res){
  //extract client id
  const {cid} = req.params
  //get page and rowsPerPage query params
  const {p,r} = req.query

  const payload = getPayload(parseInt(p),parseInt(r))

  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload
  });
}

function getArticle(req,res){
  //extract client id
  const {cid,aid} = req.params
  //get page and rowsPerPage query params
  
  const payload = getPayload(parseInt(p),parseInt(r))

  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload
  });
}

module.exports = {
  getArticles
}