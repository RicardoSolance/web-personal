const express = require("express");
const User = require("../controllers/user");
const user = require("../middlewares/authenticated");

const api = express.Router();

api.get("/user/me", [user.isAuthenticated], User.getMe);
api.get("/user/users", [user.isAuthenticated], User.getUsers);
api.post("/user/users", [user.isAuthenticated], User.createUser);

module.exports = api;
