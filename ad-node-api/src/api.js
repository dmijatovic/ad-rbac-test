const express = require("express");
const passport = require("passport");
const bearerStrategy = require("./auth_token");
const rbac = require('./rbac')

const app = express();

// define passport middleware
app.use(passport.initialize());
passport.use(bearerStrategy);

//enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API endpoint
app.get("/user",
  // passwort validates token on audience and scope
  passport.authenticate('oauth-bearer', {session: false}),
  // rbac validates user roles
  rbac,
  // user passed authentication & authorisation
  (req, res) => {
    // Service relies on the name claim.
    res.status(200).json({
      user: req.user,
      authInfo: req.authInfo
    });
  }
);

// API endpoint
app.get("/data",
  // passwort validates token on audience and scope
  passport.authenticate('oauth-bearer', {session: false}),
  // rbac validates user roles
  rbac,
  // user passed authentication & authorisation
  (req, res) => {
    res.status(200).json({
      user: req.user,
      authInfo: req.authInfo
    });
  }
);

app.get("/",(req,res)=>{
  // console.log("req:", req)
  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload:{
      baseUrl: req.baseUrl,
      headers: req.headers,
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body
    }
  });
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});
