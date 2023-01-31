const jwt = require("../utils/jwt");
// const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    if (!authorization) {
      return res.status(403).send({ msg: " No Access" });
    }
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.decoded(token);
    const { exp } = payload;
    const currentDate = new Date().getTime();
    if (exp <= currentDate) {
      res.status(400).send({ msg: "Token Caducado" });
    }
    if (typeof payload === "object") {
      res.locals.email = payload.email;
      res.locals.role = payload.role;
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400);
  }
};

const isAdmin = (req, res, next) => {
  if (res.locals.role === "admin") {
    next();
  } else {
    res.status(401).send({ msg: " No tienes permisos" });
  }
};

module.exports = { isAuthenticated };
