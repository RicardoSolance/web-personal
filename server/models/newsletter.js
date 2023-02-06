const mongoose = require("mongoose");
const mongoosePiginate = require("mongoose-paginate-v2");

const newsLetterSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
});
newsLetterSchema.plugin(mongoosePiginate);
module.exports = mongoose.model("NewsLetter", newsLetterSchema);
