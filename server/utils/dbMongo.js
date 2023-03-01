// const mongoose = require("mongoose");

// const {
//   DB_HOST,
//   DB_PASSWORD,
//   DB_USER,
//   IP_SERVER,
//   API_VERSION,
// } = require("../constants");

// // const url = process.env.URL_MONGO;
// const url =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/`;
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;

// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("*******Conexión con BD establecida**********"));

// module.exports = mongoose;
