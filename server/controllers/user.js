const User = require("../models/user");

const getMe = async (req, res, next) => {
  const { email, role, iat, exp } = req.user;

  const user = await User.findOne({ email }, { _id: 0 }); //no busca el user con el email del autenticado y nos excluye el campo _id
  console.log("usuario", user);
  res.status(200).send({ msg: "OK" });
};

module.exports = { getMe };
