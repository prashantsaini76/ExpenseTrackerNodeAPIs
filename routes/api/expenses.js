const express = require("express");
const router = express.Router();
const expenseController = require("../../controllers/expenseController");
//const ROLES_LIST = require("../../config/roles_list");
//const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(expenseController.createNewExpense)
  .put(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

//router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
