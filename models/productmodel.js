const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  image: String,
  name: String,
  slug: String,
  price: Number,
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
