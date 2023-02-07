const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FBSTORAGEBUCKET,
});
const bucket = admin.storage().bucket();

async function uploadImage(data, direction) {
  const imagen = data;
  const imgName = Date.now() + "." + imagen.originalname.split(".").pop();
  const file = bucket.file(`${direction}/` + imgName);
  const stream = file.createWriteStream({
    contentType: imagen.mimetype,
  });

  stream.on("error", (error) => {
    console.error(error);
  });

  stream.on("finish", async (error) => {
    //hacer el archivo público
    await file.makePublic();
    //obtner la url de la imagen
    let path = await file.publicUrl();
  });

  stream.end(imagen.buffer);
  console.log("urrrrrll", await file.publicUrl());
  return await file.publicUrl();
}

// const uploadImage = async (req, res, next) => {
//   const folder = req.route.path.split("/")[1];
//   if (!req.file) return next();
//   const imagen = req.file;
//   const imgName = Date.now() + "." + imagen.originalname.split(".").pop();
//   const file = bucket.file(`${folder}/` + imgName);
//   const stream = file.createWriteStream({
//     contentType: imagen.mimetype,
//   });

//   stream.on("error", (error) => {
//     console.error(error);
//   });

//   stream.on("finish", async (error) => {
//     //hacer el archivo público
//     await file.makePublic();
//     //obtner la url de la imagen
//     var path = await file.publicUrl();
//     req.file.firebaseUrl = path;
//     next();
//   });

//   stream.end(imagen.buffer);
//   return path;
// };

module.exports = { uploadImage };
