const Category = require("./../model/Category");
const asyncHandler = require("express-async-handler");

const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find().lean();
  if (!category?.length) {
    return res.status(400).json({ message: "No Categories Found" });
  }
  res.json(category);
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Confirm Data
  if (!name) {
    return res.status(400).json({ message: "Category Name is missing" });
  }

  const duplicate = Category.find(name).lean();

  if (!duplicate) {
    return res.status(409).json({ message: "Category Already Exists" });
  }

  // Create and Store New category
  const success = await Category.create({
    name,
  });

  if (success) {
    res.status(201).json({ message: `New Category ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

const createSubCategory = asyncHandler(async (req, res) => {
  const { categoryID, subCategory } = req.body;

  // Confirm Data
  if (!categoryID || !subCategory) {
    return res.status(400).json({ message: "Some fields are missing" });
  }

  // Finding category
  const category = await Category.findById(categoryID).exec();
  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }
  // checking if the subcategory already exists.
  const subcategory = category.subCategory?.filter(
    (sub) => sub === subCategory
  );

  if (subcategory.length) {
    return res.status(409).json({ message: "SubCategory already exists" });
  }

  category.subCategory?.push(subCategory);

  const success = await category.save();

  if (success) {
    res.status(201).json({ message: "Sub Category Added" });
  } else {
    res.status(400).json({ message: "Failed to add Sub Category" });
  }
});

module.exports = {
  getAllCategory,
  createCategory,
  createSubCategory,
};
