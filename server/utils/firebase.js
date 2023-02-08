const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const refFromURL = require("firebase-admin");
const { v4 } = require("uuid");

const serviceAccount = require("../config/firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FBSTORAGEBUCKET,
});
const bucket = admin.storage().bucket();

async function uploadImage(data, direction) {
  const imagen = data;
  //   const imgName = Date.now() + "." + imagen.originalname.split(".").pop();
  const imgName = v4();
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
  return await file.publicUrl();
}

async function deleteImage(url) {
  const storage = new Storage();
  const fileN = url.replace("%", "/");
  const fileName = fileN.split("/")[5];
  const buck = fileN.split("/")[4];
  // console.log(fileName);
  await storage
    .bucket(process.env.FBSTORAGEBUCKET)
    .file(`${buck}/` + fileName)
    .delete();
  console.log("fileee name :", fileName);
}

module.exports = { uploadImage, deleteImage };
