require("dotenv").config(); //PARA las variables de entorno
const app = require("./app");
const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/`,
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
