const express = require("express");
const Blog = require("../controllers/blog");
const user = require("../middlewares/authenticated");
const multiparty = require("connect-multiparty");
const multer = require("multer");
const md_upload = multiparty({ uploadDir: "./uploads/blog" });
const uploadImage = require("../utils/firebase");
const multer_upload = multer({
  storage: multer.memoryStorage(), // guarda en memoria hasta decidir donde lo queremos guardar
  limits: 2048 * 2048,
});

const api = express.Router();

api.get("/blog", Blog.getBlogs);
api.get("/blog/:path", Blog.getSingleBlog);
api.post(
  "/blog",
  [user.isAuthenticated, multer_upload.single("miniature")],
  Blog.createBlog
);
api.patch("/blog/:id", [user.isAuthenticated, md_upload], Blog.updateBlog);
api.delete("/blog/:id", [user.isAuthenticated], Blog.deleteBlog);

module.exports = api;
