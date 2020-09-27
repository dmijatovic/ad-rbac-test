const {logInfo, logError} = require('../utils/log')
/**
 * RBAC middleware
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {Object} next express next middleware function
 */
function rbac(allowedRoles=[]){
  // console.log("rbac...init...", allowedRoles)
  return (req,res,next)=>{
    // console.log("rbac...activated...", allowedRoles)
    // extract user roles from request
    // passport added these from token
    const {roles:userRoles} = req['user']
    if (allowedRoles.length > 0){
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
        logInfo(`Forbidden, 403, user roles: ${userRoles} - not allowed`);
        res.status(403).json({
          error: "Required role not found!",
          userRoles
        });
      }
    }else{
      //not allowed to access resource
      logError(`Forbidden, 403, roles not passed to RBAC module for the route: ${req['route']['path']}`);
      res.status(403).json({
        error: "Allowed roles not passed to RBAC NodeJS module for this route. Please notify the administrator about this error",
        userRoles
      });
    }
  }
}

module.exports=rbac