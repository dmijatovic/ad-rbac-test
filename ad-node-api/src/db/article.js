
const article={
  cid:"",
  aid:"",
  title:"This is article title",
  url:"https://nu.nl",
  author:"Author name",
  newsgroups:[
    "ING Domestic Radio & TV",
    "ING Domestic",
    "ING Group",
    "ING Voetbal"
  ],
  medium:"banken.nl",
  url:"https://www.banken.nl/nieuws/22650/rabobank-stelt-negatieve-rente-in-voor-spaartegoeden-boven-250000",
  page: 6,
  articleDate:"2020-09-21",
  circulation:"This is circulation comment",
  modules:[
    {
      id:"1", name:"Competitors",
      variables:[{
        id:1,label:"Competitor", type:"select",
        options:["Option 1","Option 2"]
      },{
        id:2,label:"First mention", type:"number",
      },{
        id:3,label:"Comment", type:"text"
      }]
    },{
      id:"2", name:"Module 2",
      variables:[{
        id:1,label:"Competitor", type:"select",
        options:["Option 1","Option 2"]
      },{
        id:2,label:"First mention", type:"number",
      },{
        id:3,label:"Comment", type:"text"
      }]
    }
  ]
}


function getArticle(cid,aid){
  article.cid = cid
  article.aid = aid

  return article
}

module.exports={
  getArticle
}