const express = require("express");
const passport = require("passport");
const bearerStrategy = require("./auth/auth_token");
const {loggerMiddleware, logInfo} = require('./utils/log')

const port = process.env.PORT || 5000;

const { defineProtectedRoutes,
  definePublicRoutes} = require('./router')

const api = express();

// ---------------------------------
// middleware
//----------------------------------
api.use(express.json())
api.use(loggerMiddleware)
// define passport middleware
api.use(passport.initialize());
passport.use(bearerStrategy);
//---------------------------------
// Enable CORS
api.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//---------------------------------
// Define routes
defineProtectedRoutes(api)
definePublicRoutes(api)

//---------------------------------
// Start api server
api.listen(port, () => {
  logInfo("listening on port " + port)
});
