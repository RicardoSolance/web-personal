const News = require("../models/newsletter");

const suscribeEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const newsletter = new News({ email: email.toLowerCase() });
    if (!email || email === undefined) {
      res.status(400).send({ msg: "Email obligatorio" });
    } else {
      newsletter.save((error) => {
        if (error) {
          res.status(400).send({ msg: "El email ya está registrado" });
        } else {
          res.status(200).send({ msg: "Email registrado" });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

const getEmails = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    await News.paginate({}, options, (error, emaiStored) => {
      if (error) {
        res.status(400).send({ msg: "Error al cargar los email" });
      } else {
        res.status(200).send(emaiStored);
      }
    });
  } catch (error) {}
};

const deleteEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await News.findById({ _id: id });
    if (!data) {
      res.status(404).send({ msg: "email no existe" });
    } else {
      await News.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "Email Borrado" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { suscribeEmail, getEmails, deleteEmail };
