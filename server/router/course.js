const express = require("express");
const course = require("../controllers/course");
const multiparty = require("connect-multiparty");
const is = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();

api.post("/course", [is.isAuthenticated, md_upload], course.createCourse);
api.get("/course", course.getCourses);

module.exports = api;
