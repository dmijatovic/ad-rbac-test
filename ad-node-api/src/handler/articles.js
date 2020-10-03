
const {getPayload} = require("../db/articles")

function getArticles(req,res){
  //extract client id
  const {cid} = req.params
  //get page and rowsPerPage query params
  const {p,r} = req.query

  //return dummy with received info
  // payload.client.cid = cid
  // payload.articles.page = parseInt(p)
  // payload.articles.rowsPerPage = parseInt(r)
  // payload.articles.count = payload.articles.items.length
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