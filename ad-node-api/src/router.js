// authentication middleware
const passport = require("passport");
const rbac = require('./auth/rbac')
//route handlers
const index = require("./handler/root")
const info = require("./handler/info")
const data = require("./handler/data")
const user = require("./handler/user")
const logger = require("./handler/logger")
const {getClients} = require("./handler/clients")
const {getClient} = require("./handler/client")
const {getArticles} = require("./handler/articles")
/**
 * Define protected routes. The routes are protected by
 * passport Azure AD and by rbac user role. To authenticate
 * provide bearer token in the header of the request.
 * In the token user roles must be specified for rbac.
 * Which roles are allowed is defined in auth/rbac file.
 * @param {Object} api express api/app object
 */
function defineProtectedRoutes(api){
  //---------------------------------
  // API endpoints
  //---------------------------------
  // Protected API endpoint
  api.get("/user",
    // passport validates token on audience and scope
    passport.authenticate('oauth-bearer', {session: false}),
    // rbac validates user roles,
    // pass array of allowed roles for this route
    rbac(["admin"]),
    // passed authentication & authorisation
    user
  );
  // Protected API endpoint
  api.get("/data",
    // passport validates token on audience and scope
    passport.authenticate('oauth-bearer', {session: false}),
    // rbac validates user roles,
    // pass array of allowed roles for this route
    rbac("analyst","admin"),
    // handle request
    data
  );
  // Protected API endpoint
  api.post("/logger",
    // passport validates token on audience and scope
    passport.authenticate('oauth-bearer', {session: false}),
    // rbac validates user roles
    // pass array of allowed roles for this route
    rbac(["admin"]),
    // handle request
    logger
  );
  // Protected API endpoint
  api.get("/clients",
    // passport validates token on audience and scope
    passport.authenticate('oauth-bearer', {session: false}),
    // rbac validates user roles
    // pass array of allowed roles for this route
    rbac(["analyst","admin"]),
    // handle request
    getClients
  );
  // Protected API endpoint
  api.get("/client/:cid",
    // passport validates token on audience and scope
    passport.authenticate('oauth-bearer', {session: false}),
    // rbac validates user roles
    // pass array of allowed roles for this route
    rbac(["analyst","admin"]),
    // handle request
    getClient
  );
  // Protected API endpoint
  api.get("/client/:cid/articles",
    // passport validates token on audience and scope
    passport.authenticate('oauth-bearer', {session: false}),
    // rbac validates user roles
    // pass array of allowed roles for this route
    rbac(["analyst","admin"]),
    // handle request
    getArticles
  );
}
/**
 * Define public routes avaliable for access to everyone
 * @param {Object} api express api/app object
 */
function definePublicRoutes(api){
  api.get("/info",info)
  api.get("/",index)
}

module.exports = {
  defineProtectedRoutes,
  definePublicRoutes
}
