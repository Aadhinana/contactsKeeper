const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("jwtSecret");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  //   If token not sent
  if (!token) {
    return res.status(401).json({ message: "No token, Authorization denied" });
  }

  //   Try to take user id from token
  try {
    const decodedBody = await jwt.verify(token, secret);
    // Store the user Id from the token in request
    req.user = decodedBody.id;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
