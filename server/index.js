require("dotenv").config(); //PARA las variables de entorno
const app = require("./app");
const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
const {
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  IP_SERVER,
  API_VERSION,
} = require("./constants");

mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) console.log("error:", error);
    console.log("La conexion con la BD ha sido establecida \n");
    app.listen(port, () => {
      console.log("#######################################");
      console.log("############ API REST #################");
      console.log("#######################################");
      console.log(
        `http://${process.env.IP_SERVER}:${port}/api/${process.env.API_VERSION}`
      );
    });
  }
);
