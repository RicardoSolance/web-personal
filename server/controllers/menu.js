const Menu = require("../models/menu");

const createMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    menu.save((error, menuStored) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear el menu" });
      } else {
        res.status(200).send(menuStored);
      }
    });
  } catch (error) {}
};

const getMenu = async (req, res) => {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await Menu.find().sort({ order: "asc" });
  } else {
    response = await Menu.find({ active }).sort({ order: "asc" });
  }
  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado ningun menu" });
  } else {
    res.status(200).send(response);
  }
};

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menuToUpdate = req.body;
    const menu = await Menu.findById({ _id: id });
    if (!menu) {
      res.status(400).send({ msg: "Este menu no Existe" });
    } else {
      await Menu.findOneAndUpdate({ _id: id }, menuToUpdate);
      res.status(200).send({ msg: "Menu Actuaizado" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await Menu.findOneAndDelete({ _id: id });
    res.status(200).send({ ok: 1 });
  } catch (error) {
    next(error);
  }
};
module.exports = { createMenu, getMenu, updateMenu, deleteMenu };
