const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  image: String,
  name: String,
  slug: String,
  price: Number,
});

const CarttModel = mongoose.model("cart", CartSchema);

module.exports = CarttModel;
