const express = require("express");
const menuController = require("../controllers/menu");
const user = require("../middlewares/authenticated");

const api = express.Router();

api.get("/menu", menuController.getMenu);
api.post("/menu", [user.isAuthenticated], menuController.createMenu);
api.patch("/menu/:id", [user.isAuthenticated], menuController.updateMenu);

module.exports = api;
