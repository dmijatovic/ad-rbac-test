/* example TOKEN info returned
{
  "user": {
    "oid": "ffafb89a-f7cb-4d59-810d-72097d807317",
    "name": "Dusan Mijatovic",
    "email": "d.mijatovic@dv4all.nl",
    "ipadr": "143.178.74.12",
    "roles": [
      "analyst",
      "admin"
    ]
  },
  "authInfo": {
    "aud": "0bb2e832-fe23-44d2-920e-120caf021a74",
    "iss": "https://login.microsoftonline.com/0f22a838-ece9-49f4-b8dc-e71e2a5d705c/v2.0",
    "iat": 1601715667,
    "nbf": 1601715667,
    "exp": 1601719567,
    "aio": "AWQAm/8RAAAAlD8pKTeupAczv+4CZBh110vzpY5/6EGmxA0ImgjHB3rtbX5cU7+SLqcDCVECmZTIxKk/U26sdYTJEgZE72TN9t0WX6YIzs0cRe7srD/R2oVM85fyYhVQ3aXL2e8y5c3p",
    "azp": "0bb2e832-fe23-44d2-920e-120caf021a74",
    "azpacr": "0",
    "email": "d.mijatovic@dv4all.nl",
    "idp": "live.com",
    "ipaddr": "143.178.74.12",
    "name": "Dusan Mijatovic",
    "oid": "ffafb89a-f7cb-4d59-810d-72097d807317",
    "preferred_username": "d.mijatovic@dv4all.nl",
    "rh": "0.AAAAOKgiD-ns9Em43OceKl1wXDLosgsj_tJEkg4SDK8CGnR0AKM.",
    "roles": [
      "analyst",
      "admin"
    ],
    "scp": "api.test.scope",
    "sub": "rg1jbfbuhE-ubJM0m2VrX85cF46v0ewQPNcwy24-mok",
    "tid": "0f22a838-ece9-49f4-b8dc-e71e2a5d705c",
    "uti": "VNeoek0cp0y77ByZtgTUAQ",
    "ver": "2.0"
  }
}

*/
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