const express = require("express");
const course = require("../controllers/course");
const multiparty = require("connect-multiparty");
const is = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/course" });
const api = express.Router();

api.get("/course", course.getCourses);
api.post("/course", [is.isAuthenticated, md_upload], course.createCourse);
api.patch("/course/:id", [is.isAuthenticated, md_upload], course.updateCourse);

module.exports = api;
