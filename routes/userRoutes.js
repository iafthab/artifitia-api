const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

router.route("/signIn").post(userController.signIn);
router.route("/signUp").post(userController.signUp);

module.exports = router;
