const express = require("express");
const News = require("../controllers/newsLetter");
const user = require("../middlewares/authenticated");

const api = express.Router();

api.post("/newsletter", News.suscribeEmail);
api.get("/newsletter", [user.isAuthenticated], News.getEmails);
api.delete("/newsletter/:id", [user.isAuthenticated], News.deleteEmail);
module.exports = api;
