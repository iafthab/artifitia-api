const Product = require("./../model/Products");
const asyncHandler = require("express-async-handler");

//?
const getProduct = asyncHandler(async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ message: "ID Missing" });

  const product = await Product.findById(req.params.id).exec();
  if (!product) {
    return res.status(400).json({ message: "Product Not Found." });
  }
  res.json(product);
});

//?
const getAllProducts = asyncHandler(async (req, res) => {
  //TODO pagination
  const products = await Product.find().select("name variants images").lean();
  if (!products?.length) {
    return res.status(400).json({ message: "No Products Found" });
  }
  res.json(products);
});

//?
const getProductByCategory = asyncHandler(async (req, res) => {
  if (!req?.params?.categoryID)
    return res.status(400).json({ message: "Category ID Missing" });
  //TODO pagination
  const products = await Product.find({ category: req.params.category })
    .select("name variants images")
    .lean();
  if (!products?.length) {
    return res.status(400).json({ message: "No Products Found" });
  }
  res.json(products);
});

//?
const getProductBySubCategory = asyncHandler(async (req, res) => {
  if (!req?.params?.subcategory)
    return res.status(400).json({ message: "subcategory Missing" });
  //TODO pagination
  const products = await Product.find({
    subCategory: req.params.subcategory,
  })
    .select("name variants images")
    .lean();
  if (!products?.length) {
    return res.status(400).json({ message: "No Products Found" });
  }
  res.json(products);
});

//?
const createNewProduct = asyncHandler(async (req, res) => {
  const { name, description, variants, category, subcategory, images } =
    req.body;

  // Confirm Data
  if (
    !name ||
    !variants ||
    !description ||
    !category ||
    !subcategory ||
    !images
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and Store New product
  const success = await Product.create({
    name,
    description,
    variants,
    category,
    subcategory,
    images,
  });

  if (success) {
    res.status(201).json({ message: `New Product ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

//?
const updateProduct = asyncHandler(async (req, res) => {
  const { id, name, description, variants, category, subcategory, images } =
    req.body;

  // Confirm Data
  if (
    !id ||
    !name ||
    !variants ||
    !description ||
    !category ||
    !subcategory ||
    !images
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find Product
  const product = await Product.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }

  product.name = name;
  product.description = description;
  product.variants = variants;
  product.category = category;
  product.subcategory = subcategory;
  product.images = images;

  await product.save();

  res.json({ message: "Product Updated" });
});

module.exports = {
  getProduct,
  getAllProducts,
  getProductByCategory,
  getProductBySubCategory,
  createNewProduct,
  updateProduct,
};
