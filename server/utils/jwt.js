const jwt = require("jsonwebtoken");
// const { SECTRET_KEY } = require("../constants");
const SESSION_TIME = 60 * 60;

const createAccesToken = (user) => {
  const expireSession = Date.now() + SESSION_TIME * 1000;

  const payload = {
    token_type: "refresh",
    email: user.email,
    role: user.role,
    iat: Date.now(),
    exp: expireSession,
  };
  return jwt.sign(payload, process.env.SECTRET_KEY);
};

const createRefreshToken = (user) => {
  const expireSession = Date.now() + SESSION_TIME * 1000;
  const payload = {
    token_type: "refresh",
    email: user.email,
    role: user.role,
    iat: Date.now(),
    exp: expireSession,
  };

  return jwt.sign(payload, process.env.SECTRET_KEY);
};

const decoded = (token) => {
  return jwt.decode(token, process.env.SECTRET_KEY, { complete: true });
};

module.exports = { createAccesToken, createRefreshToken, decoded };
