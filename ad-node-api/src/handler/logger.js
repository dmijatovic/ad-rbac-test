const {logInfo} = require('../utils/log')

module.exports = function logger (req, res){
  const data = req.body
  if (data) {
    const msg = JSON.stringify(data)
    logInfo(msg)
    res.status(200).json({
      status:"200",
      statusText:"OK",
      payload: msg
    });
  } else {
    res.status(400).json({
      status:"400",
      statusText:"Bad request: no data found",
      payload:{
        user: req.user,
        authInfo: req.authInfo
      }
    });
  }
}