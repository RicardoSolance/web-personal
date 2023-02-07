const express = require("express");
const User = require("../controllers/user");
const user = require("../middlewares/authenticated");
const { multer_upload } = require("../helpers/converters");
const api = express.Router();

api.get("/user/me", [user.isAuthenticated], User.getMe);
api.get("/user/users", [user.isAuthenticated], User.getUsers);
api.post("/user", [user.isAuthenticated, multer_upload.single("avatar")], User.createUser);
api.patch("/user/:email", [user.isAuthenticated, multer_upload.single("avatar")], User.updateUser);
api.delete("/user/:id", [user.isAuthenticated], User.deleteUser);

module.exports = api;
