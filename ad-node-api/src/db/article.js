
const article={
  cid:"",
  aid:"",
  title:"This is article title",
  url:"https://nu.nl",
  author:"Author name"
}


function getArticle(cid,aid){
  article.cid = cid
  article.aid = aid 

  return article
}

module.exports={
  getArticle
}