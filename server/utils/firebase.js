const admin = require("firebase-admin");
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
  //   const fileUrl = "https://firebasestorage.googleapis.com/b/bucket/o/images%20geeksforgeeks.jpg";
  //   const fileUrl = url.split("/")[4].replace("%", "/");
  const fileUrl = url.replace("%", "/");
  console.log("1", url.split("/")[4], "2", fileUrl);
  const file = bucket.file(url.split("/")[4]);
  // }
  // Create a reference to the file to delete
  //   var fileRef = storage.refFromURL(fileUrl);

  file
    .delete()
    .then(() => {
      console.log(`Successfully deleted photo with UID: ${photoUID}, userUID : ${userUID}`);
    })
    .catch((err) => {
      console.log(`Failed to remove photo, error: ${err}`);
    });
}

module.exports = { uploadImage, deleteImage };
