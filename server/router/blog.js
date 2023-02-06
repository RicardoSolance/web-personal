const express = require("express");
const Blog = require("../controllers/blog");
const user = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty");
const md_upload = multiparty({ uploadDir: "./uploads/blog" });

const api = express.Router();

api.get("/blog", Blog.getBlogs);
api.get("/blog/:path", Blog.getSingleBlog);
api.post("/blog", [user.isAuthenticated, md_upload], Blog.createBlog);
api.patch("/blog/:id", [user.isAuthenticated, md_upload], Blog.updateBlog);
api.delete("/blog/:id", [user.isAuthenticated], Blog.deleteBlog);

module.exports = api;
