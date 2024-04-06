const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/auth");
const ProductRoutes = require("./Routes/product");
const CartRoutes = require("./Routes/cart");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://mdabdulq62:nadim123@cluster0.mjympox.mongodb.net/arba?retryWrites=true&w=majority');
    console.log("connect");
  } catch (error) {
    console.log(error);
  }
};

app.get("/", async (req, res) => {
    res.send('hello form backend')
});

app.use("/user", authRoutes)
app.use("/product", ProductRoutes)
app.use("/cart", CartRoutes)
app.listen(3020, () => {
  connect();
  console.log("server is running 3020");
});