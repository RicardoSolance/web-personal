const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

const salt = bcrypt.genSaltSync(10);

const register = async (req, res, next) => {
  const { fistname, lastname, password, email } = req.body;
  try {
    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "la contrseña es obligatorio" });
    const hashPassword = bcrypt.hashSync(password, salt);
    const isUser = await User.findOne({ email });
    if (isUser) {
      res.json({ message: " Usuario no ha podido ser registrado" });
    } else {
      const user = new User({
        fistname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
        password: hashPassword,
      });
      await user.save();
      res.json({ message: " Usuario registrado" });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(400).send({ msg: "Los campos no coinciden" });
      } else if (!user.active) {
        res
          .status(401)
          .send({ msg: "Usurio no activo, contacta con el Administrador" });
      } else {
        res.status(200).send({
          access: jwt.createAccesToken(user),
          refresh: jwt.createRefreshToken(user),
        });
      }
    } else {
      res.status(400).send({ msg: "Error en el servidor" });
    }
  } catch (error) {
    next(error);
  }
};

const renewToken = async (req, res, next) => {
  const { token } = req.body;
  console.log("el token es", req.body);
  try {
    if (!token) {
      res.status(400).send({ msg: "Token requerido" });
    } else {
      const { email } = jwt.decoded(token);
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).send({ msg: "Error en el Servidor" });
      } else {
        res.status(500).send({ accessToken: jwt.createAccesToken(user) });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, renewToken };
