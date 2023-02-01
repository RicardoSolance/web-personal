const express = require("express");
const multiparty = require("connect-multiparty");
const User = require("../controllers/user");
const user = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./upload/avatar" });
const api = express.Router();

api.get("/user/me", [user.isAuthenticated], User.getMe);
api.get("/user/users", [user.isAuthenticated], User.getUsers);
api.post("/user", [user.isAuthenticated], User.createUser);

module.exports = api;
