const multer = require("multer");
const fillSpace = (data) => {
  return data.replace(/ /g, "-");
};

const multer_upload = multer({
  storage: multer.memoryStorage(), // guarda en memoria hasta decidir donde lo queremos guardar
  limits: 2048 * 2048,
});

module.exports = { fillSpace, multer_upload };
