const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const image = require("../utils/image");
const { use } = require("../router/user");

const getMe = async (req, res, next) => {
  const { email, role, iat, exp } = req.user;

  const user = await User.findOne({ email }, { _id: 0 }); //nos busca el user con el email del autenticado y nos excluye el campo _id
  if (!user) {
    res.status(400).send({ msg: "No se ha encontrado el mensaje" });
  } else {
    res.status(200).send(user);
  }
  // res.status(200).send({ msg: "OK" });
};

const getUsers = async (req, res) => {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
};

const createUser = async (req, res) => {
  const { fistname, lastname, password, email } = req.body;
  const salt = bcrypt.genSaltSync(10);
  try {
    if (res.locals.role !== "admin") {
      res
        .status(401)
        .send({ msg: "No tienes permisos para realizar esta operacion" });
    } else {
      if (!email) res.status(400).send({ msg: "El email es obligatorio" });
      if (!password)
        res.status(400).send({ msg: "la contrseña es obligatoria" });
      const hashPassword = bcrypt.hashSync(password, salt);
      const isUser = await User.findOne({ email });
      if (isUser) {
        res.status(400).send({ msg: " Usuario no puede ser registrado" });
      } else {
        let imagePath = "";
        if (req.files.avatar) {
          imagePath = image.getImagePath(req.files.avatar);
          console.log("image ruta :", imagePath);
        }
        const user = new User({
          fistname,
          lastname,
          email: email.toLowerCase(),
          role: "user",
          active: false,
          password: hashPassword,
          avatar: imagePath,
        });
        await user.save();
        res.json({ msg: " Usuario registrado" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const dataToUpdate = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }, { _id: 0 });
    if (!user) {
      res.status(404).send({ msg: "No se puede actualizar a este usuario" });
    } else {
      await User.findOneAndUpdate({ email: email.toLowerCase() }, dataToUpdate);
      res.status(404).send({ msg: "USuario Actuaizado" });
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (req, res) => {
  res.status(200).send({ msg: "deleted" });
};
module.exports = { getMe, getUsers, createUser, updateUser, deleteUser };
