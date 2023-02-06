const mongoose = require("mongoose");
const mongoosePiginate = require("mongoose-paginate-v2");
const CourseSchema = mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  price: Number,
  score: Number,
  category: {
    type: String,
    enum: ["programacion", "diseño Ui Ux", "librerias", "maquetacion"],
  },
});

CourseSchema.plugin(mongoosePiginate);

module.exports = mongoose.model("Course", CourseSchema);
