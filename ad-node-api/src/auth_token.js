const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const options = require("./config")

const bearerStrategy = new BearerStrategy(options,
  function(token, done) {
    // console.log("verifying token: ", token)
    done(null,{
      //user info -> req.user
      oid: token.oid,
      name: token.name,
      email: token['email'] ? token['email']:"",
      ipadr: token['ipaddr'] ? token['ipaddr']:"",
      roles: token['roles'] ? token['roles']:[],
    },
      //req.authInfo
      token
    )
  }
);



module.exports=bearerStrategy