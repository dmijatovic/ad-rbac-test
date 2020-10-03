const payload={
  "client":{
    "cid": "234234",
    "name": "Most important client",
    "items":{
      "todo":13,
      "completed":234
    }
  },
  "articles":{
    "page":0,
    "rowsPerPage":50,
    "count":3,
    "items":[{
      "aid":"12345",
      "title":"First article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"Telegraph.nl",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12346",
      "title":"Second article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"De Telegraph",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12347",
      "title":"Thirdt article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"NU.nl",
      "notes":"This is short comment on this"
    }]
  }
}


function getArticles(req,res){
  //extract client id
  const {cid} = req.params
  //get page and rowsPerPage query params
  const {p,r} = req.query

  //return dummy with received info
  payload.client.cid = cid
  payload.articles.page = parseInt(p)
  payload.articles.rowsPerPage = parseInt(r)

  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload
  });
}

module.exports = {
  getArticles
}