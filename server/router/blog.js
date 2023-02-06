const express = require("express");
const Blog = require("../controllers/blog");
const is = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty");
const md_upload = multiparty({ uploadDir: "./uploads/blog" });

const api = express.Router();

api.get("/blog", Blog.getBlogs);
api.post("/blog", [is.isAuthenticated, md_upload], Blog.createBlog);
api.patch("/blog/:id", [is.isAuthenticated, md_upload], Blog.updateBlog);

module.exports = api;
