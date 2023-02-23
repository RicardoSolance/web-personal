const Course = require("../models/course");
const image = require("../utils/image");
const { uploadImage, deleteImage } = require("../utils/firebase");

const createCourse = async (req, res, next) => {
  try {
    const { title, miniature, description, url, price, score, category } = req.body;
    const data = { title, miniature, description, url, price, score, category };
    if (req.file) {
      data.miniature = await uploadImage(req.file, "course");
    }
    const course = new Course(data);
    course.save((error, courseStored) => {
      if (error) {
        res.status(400).send({ msg: error });
      } else {
        res.status(200).send(courseStored);
      }
    });
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req, res, next) => {
  const { page = 1, limit = 6 } = req.query;
  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    Course.paginate({}, options, (error, courseStored) => {
      if (error) {
        res.status(400).send({ msg: "Error al cargar el curso" });
      } else {
        res.status(200).send(courseStored);
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    // console.log("id", id);
    const course = await Course.findOne({ _id: id });
    console.log("curso a actualizar:", course);
    if (!course) {
      res.status(404).send({ msg: "No se puede actualizar este curso" });
    } else {
      if (req.file) {
        if (course.miniature) {
          await deleteImage(course.miniature);
        }
        imagePath = await uploadImage(req.file, "course");
        dataToUpdate.miniature = imagePath;
      }
      console.log("curso a ser actulizado", dataToUpdate);
      await Course.findOneAndUpdate({ _id: id }, dataToUpdate);
      res.status(200).send({ msg: "Curso Actuaizado" });
    }
  } catch (error) {
    next(error);
  }
};
const deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    await Course.findOneAndDelete({ _id: id });
    res.status(200).send({ ok: "Curso borrado con Éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
