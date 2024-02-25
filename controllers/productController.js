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
  const page = parseInt(req.query.page, 10) || 0;

  const products = await Product.find()
    .skip(page * 6)
    .limit(6)
    .select("name variants images")
    .lean();
  if (!products?.length) {
    return res.status(400).json({ message: "No Products Found" });
  }
  res.json(products);
});

//?
const getProductBySubCategory = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 0;

  if (!req?.params?.sub)
    return res.status(400).json({ message: "subcategory Missing" });
  const products = await Product.find({
    subCategory: req.params.sub,
  })
    .skip(page * 6)
    .limit(6)
    .select("name variants images")
    .lean();
  if (!products?.length) {
    return res.status(400).json({ message: "No Products Found" });
  }
  res.json(products);
});

//?
const createNewProduct = asyncHandler(async (req, res) => {
  console.log("new product");
  const { name, description, variants, subCategory } = req.body;

  // Confirm Data
  if (
    !name ||
    !variants ||
    !description ||
    !subCategory
    // || !images
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and Store New product
  const success = await Product.create({
    name,
    description,
    variants,
    subCategory,
  });

  if (success) {
    res.status(201).json({ message: `New Product ${name} created` });
  } else {
    res.status(400).json({ message: "Invalid data received" });
  }
});

//?
const updateProduct = asyncHandler(async (req, res) => {
  const { id, name, description, variants, subCategory } = req.body;

  // Confirm Data
  if (
    !id ||
    !name ||
    !variants ||
    !description ||
    !subCategory
    // || !images
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
  product.subCategory = subCategory;
  product.images = images;

  await product.save();

  res.json({ message: "Product Updated" });
});

module.exports = {
  getProduct,
  getAllProducts,
  getProductBySubCategory,
  createNewProduct,
  updateProduct,
};
