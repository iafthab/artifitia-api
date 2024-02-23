// importing modules and json file for data
import { Router } from "express";
const router = Router();
import {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} from "../controllers/employeesController";

// providing the route once(since all requests goto the same route)
// and then chaining different requests together.
router
  .route("/")
  .get(getAllEmployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployee);

export default router;
