const express = require('express');
const CategoryModel = require('../models/categorymodel');

const CategoryRoutes = express.Router();

CategoryRoutes.get('/get', async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

CategoryRoutes.get('/:id', getCategory, (req, res) => {
  res.json(res.category);
});

CategoryRoutes.post('/postcategory', async (req, res) => {
  const { image, title, description, price, category } = req.body;
  const categoryData = new CategoryModel({ image, title, description, price, category });
  try {
    const newCategory = await categoryData.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

CategoryRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

CategoryRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Category deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

async function getCategory(req, res, next) {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.category = category;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = CategoryRoutes;
