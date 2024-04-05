const express = require('express');
const ProductModel = require('../models/productmodel');

const ProductRoutes = express.Router();

ProductRoutes.get('/get', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

ProductRoutes.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

ProductRoutes.post('/postproduct', async (req, res) => {
  const product = new ProductModel({
    image: req.body.image,
    name: req.body.name,
    slug: req.body.slug,
    price: req.body.price
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



ProductRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ProductModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ msg: "Data Update" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

ProductRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ProductModel.findByIdAndDelete({ _id: id }, req.body);
    res.status(200).json({ msg: "Data deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


async function getProduct(req, res, next) {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.product = product;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = ProductRoutes;
