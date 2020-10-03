
const clients=[{
  "cid":"234234",
  "name":"First client name",
  "articles":{
    "todo":13,
    "completed":7
  },
  "lastLogin":"2020-09-20"
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
},{
  "cid":"234237",
  "name":"Forth client name",
  "articles":{
    "todo":1,
    "completed":17
  },
  "lastLogin":"2020-09-23"
},{
  "cid":"234238",
  "name":"Another client name",
  "articles":{
    "todo":0,
    "completed":70
  },
  "lastLogin":"2020-09-21"
}]


function getClients(oid){
  //just return dummy data for now
  return clients
}

module.exports={
  getClients
}