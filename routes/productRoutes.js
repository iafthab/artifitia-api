const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createNewProduct)
  .put(productController.updateProduct);

router.route("/:id").get(productController.getProduct);
router
  .route("/category/:categoryID")
  .get(productController.getProductByCategory);
router.route("/subcategory/:subcategory").get(productController.getProduct);

module.exports = router;
