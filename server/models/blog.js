const mongoose = require("mongoose");
const mongoosePiginate = require("mongoose-paginate-v2");

const blogSchema = mongoose.Schema({
  title: { type: String, require: true },
  miniature: String,
  content: String,
  path: {
    type: String,
    unique: true,
  },
  created: Date,
});

blogSchema.plugin(mongoosePiginate);

module.exports = mongoose.model("blog", blogSchema);
