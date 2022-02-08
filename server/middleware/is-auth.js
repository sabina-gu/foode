const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const authHeader = req.get("Autorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.get("secretKey"));
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = false;
  req.userId = decodedToken.userId;
  next();
};
