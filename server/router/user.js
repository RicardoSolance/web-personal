const express = require("express");
const UserController = require("../controllers/user");
const user = require("../middlewares/authenticated");

const api = express.Router();

api.get("/user/me", [user.isAuthenticated], UserController.getMe);

module.exports = api;
