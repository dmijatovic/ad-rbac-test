/**
 * Route guard definitions
 * per path array of allowed roles
 */
const guard={
  "/":[],
  "/user":["admin"],
  "/data":["analyst","admin"]
}
/**
 * RBAC middleware
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Object} next express next middleware function
 */
function rbac(req,res,next){
  //extract user roles from request
  //passport added these from token
  const {roles:userRoles} = req['user']
  // extract route path from request
  const {path} = req['route']
  // extract allowed routes from guard object
  const allowedRoles = guard[path]
  // console.log(`rbac...userRoles:${userRoles}...allowedRoles: ${allowedRoles}`)  
  // check user roles: if allowedRoles array is empty the route is not protected by rbac
  if (allowedRoles.length === 0) return next()
  // check user roles
  const allowedUserRoles = userRoles.filter(role=>{
    return allowedRoles.includes(role)
  })
  // console.log("allowedUserRoles:", allowedUserRoles);
  // console.log("allowedUserRoles.length:", allowedUserRoles.length);
  if (allowedUserRoles.length > 0){
    //at least one role is allowed
    next()
  }else{
    //not allowed to access resource
    console.log("Forbidden, 403");
    res.status(403).json({
      error: "Required role not found!",
      roles: userRoles
    });
  }
}

module.exports=rbac