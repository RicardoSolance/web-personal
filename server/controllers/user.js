const User = require("../models/user");

const getMe = async (req, res, next) => {
  const { email, role, iat, exp } = req.user;

  const user = await User.findOne({ email }, { _id: 0 }); //no busca el user con el email del autenticado y nos excluye el campo _id
  if (!user) {
    res.status(400).send({ msg: "No se ha encontrado el mensaje" });
  } else {
    res.status(200).send(user);
  }
  // res.status(200).send({ msg: "OK" });
};

module.exports = { getMe };
