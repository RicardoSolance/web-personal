const express = require("express");
const multiparty = require("connect-multiparty");
const User = require("../controllers/user");
const user = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.get("/user/me", [user.isAuthenticated], User.getMe);
api.get("/user/users", [user.isAuthenticated], User.getUsers);
api.post("/user", [user.isAuthenticated, md_upload], User.createUser);
api.patch("/user/:email", [user.isAuthenticated, md_upload], User.updateUser);
api.delete("/user/:email", [user.isAuthenticated, md_upload], User.deleteUser);

module.exports = api;
