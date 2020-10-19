const express = require("express");
const router = express.Router();

const Employee = require("../../models/Employee");

//@route GET /api/employees
router.get("/", (req, res) => {
  Employee.find()
    .populate("city")
    .populate("job")
    .populate("department")
    .populate("clinic")
    .then((employees) => res.json(employees))
    .catch((err) => console.log(err));
});

module.exports = router;
