
module.exports = (req, res) => {
  res.status(200).json({
    status:"200",
    statusText:"OK",
    payload:{
      user: req.user,
      authInfo: req.authInfo
    }
  });
}