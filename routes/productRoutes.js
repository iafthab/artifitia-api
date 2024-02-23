const express = require("express");
const router = express.Router();
const paperController = require("./../controllers/paperController");

// providing the route once(since all requests goto the same route)
// and then chaining different requests together.
router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
