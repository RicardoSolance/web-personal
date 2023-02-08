const express = require("express");
const Blog = require("../controllers/blog");
const user = require("../middlewares/authenticated");
const { multer_upload } = require("../helpers/converters");

const api = express.Router();

api.get("/blog", Blog.getBlogs);
api.get("/blog/:path", Blog.getSingleBlog);
api.post("/blog", [user.isAuthenticated, multer_upload.single("miniature")], Blog.createBlog);
api.patch("/blog/:id", [user.isAuthenticated, multer_upload.single("miniature")], Blog.updateBlog);
api.delete("/blog/:id", [user.isAuthenticated], Blog.deleteBlog);

module.exports = api;
