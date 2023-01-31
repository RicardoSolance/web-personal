const express = require("express");
const { API_VERSION } = require("./constants");
const cors = require("cors");
const app = express();

//import routing
const autRouter = require("./router/auth");
const userRouter = require("./router/user");

//config Body Parser--->> el body parser esta deprecado
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //para habilitar la recepcion de datos en un request

// config static folder
app.use(express.static("uploads"));

//config Header HTTP - CORS
app.use(cors());

//config routings

app.use(`/api/${process.env.API_VERSION}`, autRouter);
app.use(`/api/${process.env.API_VERSION}`, userRouter);

module.exports = app;
