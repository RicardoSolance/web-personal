const Blog = require("../models/blog");
const image = require("../utils/image");
const helpme = require("../helpers/converters");
const { uploadImage } = require("../utils/firebase");

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
    const { title, content, miniature } = req.body;
    let fullpath = helpme.fillSpace(title);
    const post = {
      title,
      content,
      path: fullpath,
      created: new Date(),
    };
    if (req.file) {
      post.miniature = await uploadImage(req.file, "blog");
    }
    const article = new Blog(post);
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
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      res.status(404).send({ msg: "No se puede actualizar este Blog" });
    } else {
      if (req.files.miniature) {
        imagePath = await uploadImage(req.file, "blog");
        article.miniature = imagePath;
      }
      article.path = helpme.fillSpace(article.title);
      await Blog.findByIdAndUpdate({ _id: id }, article);
      res.status(200).send({ msg: "Blog Actualizado" });
    }
  } catch (error) {
    next(error);
  }
};

const getSingleBlog = async (req, res, next) => {
  const { path } = req.params;
  try {
    const article = await Blog.findOne({ path });
    if (!article) {
      res.status(500).send({ msg: "Problemas al cargar ese Articulo" });
    } else {
      res.status(400).send(article);
    }
  } catch (error) {}
};

const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Blog.findOneAndDelete({ _id: id });
    res.status(200).send({ ok: "Blog borrado con Éxito" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
};
