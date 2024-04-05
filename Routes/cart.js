const express = require('express');
const CartModel = require('../models/cartmodel');

const CartRoutes = express.Router();

CartRoutes.post('/addtocart', async (req, res) => {
  try {
    const cartItem = new CartModel({
      image: req.body.image,
      name: req.body.name,
      slug: req.body.slug,
      price: req.body.price
    });
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

CartRoutes.get('/cartitems', async (req, res) => {
  try {
    const cartItems = await CartModel.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = CartRoutes;
