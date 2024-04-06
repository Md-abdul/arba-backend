const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  image: String,
  title: String,
  description: String,
  price: Number,
  category : String
});

const CategoryModel = mongoose.model("category", CategorySchema);

module.exports = CategoryModel;
