const jwt = require("jsonwebtoken");
module.exports.checkAccess = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "Token is not provided" });
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token", err });
    req.user = user;
    next();
  });
};
