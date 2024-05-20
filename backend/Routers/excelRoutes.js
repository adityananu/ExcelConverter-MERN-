const express = require("express");
const router = express();
const {
  addFields,
  employeesData,
  delField,
} = require("../controllers/excelController");

router.route("/employeesData").get(employeesData);
router.route("/addFields").post(addFields);
router.route("/delField/:fullname").delete(delField);

module.exports = router;
