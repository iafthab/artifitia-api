const express = require("express");
const router = express.Router();
const productController = require("./../controllers/productController");
// const uuidv4 = require("uuid/v4");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'public');
//   },
//   filename: (req, file, cb) => {
//       const fileName = file.originalname.toLowerCase().split(' ').join('-');
//       cb(null, uuidv4() + '-' + fileName)
//   }
// });
// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//           cb(null, true);
//       } else {
//           cb(null, false);
//           return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//   }
// });

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createNewProduct)
  .put(productController.updateProduct);

router.route("/:id").get(productController.getProduct);

router
  .route("/subcategory/:sub")
  .get(productController.getProductBySubCategory);

module.exports = router;
