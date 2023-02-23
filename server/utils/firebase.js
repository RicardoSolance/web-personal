const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const { v4 } = require("uuid");

const serviceAccount = require("../config/firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FBSTORAGEBUCKET,
});
const bucket = admin.storage().bucket();

async function uploadImage(data, direction) {
  const imagen = data;
  const imgName = Date.now() + "." + imagen.originalname.split(".").pop();
  console.log("imagen name upload", imgName);
  // const imgName = v4();
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
  const fileN = url.replace("%", "/");
  console.log("filemane", fileN);
  const fileName = fileN.split("/")[5];
  const folder = fileN.split("/")[4];
  // console.log("filemane", fileName.split(".")[0], folder);
  const dat = `${folder}/${fileName}`;
  //-----------------------
  const storage = new Storage({
    projectId: "web-personal-f0e54",
    keyFilename: serviceAccount,
  });

  const bucket = storage.bucket(process.env.FBSTORAGEBUCKET);
  const file = bucket.file(dat);
  await file.delete();

  console.log(`File ${fileName} deleted from bucket ${bucketName}.`);

  ///------------------------------------------------
  // const path = "10bd2dfd-f6a4-425e-ad67-07eafc18a69d";
  // console.log("fiiiiii", path);
  // try {
  //   await bucket.file(path).delete();
  //   console.log(`File ${path} deleted successfully.`);
  // } catch (error) {
  //   console.error(`Error deleting file ${path}`, error);
  // }

  // console.log("fileee name :", path);
}

module.exports = { uploadImage, deleteImage };
