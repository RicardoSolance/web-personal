const Blog = require("../models/blog");
const image = require("../utils/image");

const getBlogs = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;
  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { created: "desc" },
    };

    Blog.paginate({}, options, (error, blogStored) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear el blog" });
      } else {
        res.status(200).send(blogStored);
      }
    });
  } catch (error) {
    next(error);
  }
};
const createBlog = async (req, res, next) => {
  try {
    const article = new Blog(req.body);
    article.created = new Date();
    const imagePath = image.getImagePath(req.files.miniature);
    article.miniature = imagePath;
    article.save((error, blogStored) => {
      if (error) {
        res.status(400).send({ msg: "no se ha podido crear este blog" });
      } else {
        res.status(201).send(blogStored);
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = req.body;
    console.log("id", id);
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      res.status(404).send({ msg: "No se puede actualizar este Blog" });
    } else {
      if (req.files.miniature) {
        imagePath = image.getImagePath(req.files.avatar);
        blog.miniature = imagePath;
      }
      await Blog.findByIdAndUpdate({ _id: id }, article);
      res.status(200).send({ msg: "Blog Actualizado" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { createBlog, getBlogs, updateBlog };
