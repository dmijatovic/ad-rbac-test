const { response } = require("express")

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
    "count":12,
    "items":[{
      "cid":"234234",
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
      "cid":"234235",
      "aid":"12347",
      "title":"Thirdt article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"NU.nl",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12348",
      "title":"First article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"Telegraph.nl",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12349",
      "title":"Second article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"De Telegraph",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12350",
      "title":"Thirdt article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"NU.nl",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"123451",
      "title":"First article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"Telegraph.nl",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12352",
      "title":"Second article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"De Telegraph",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12353",
      "title":"Thirdt article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"NU.nl",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"123454",
      "title":"First article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"Telegraph.nl",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12355",
      "title":"Second article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"De Telegraph",
      "notes":"This is short comment on this"
    },{
      "cid":"234234",
      "aid":"12356",
      "title":"Thirdt article title",
      "summary":"Simple summary",
      "date":"2020-09-29",
      "medium":"NU.nl",
      "notes":"This is short comment on this"
    }]
  }
}

/**
 * Get dummt payload data
 * @param {number} p page
 * @param {number} r rowsPerPage
 */
function getPayload(p,r){

  const itemCount = payload.articles.items.length
  let data=[]
  // we have more records than requested
  data = payload.articles.items.slice(p * r, p*r + r)

  //deep copy?!?
  const response = {
    ...payload,
    articles:{
      page:p,
      rowsPerPage:r,
      count: itemCount,
      items:[
        ...data
      ]
    }
  }
  return response
}

module.exports={
  getPayload
}