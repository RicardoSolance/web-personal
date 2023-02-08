const express = require("express");
const course = require("../controllers/course");
const user = require("../middlewares/authenticated");
const { multer_upload } = require("../helpers/converters");

const api = express.Router();

api.get("/course", course.getCourses);
api.post("/course", [user.isAuthenticated, multer_upload.single("miniature")], course.createCourse);
api.patch("/course/:id", [user.isAuthenticated, multer_upload.single("miniature")], course.updateCourse);
api.delete("/course/:id", [user.isAuthenticated], course.deleteCourse);

module.exports = api;
