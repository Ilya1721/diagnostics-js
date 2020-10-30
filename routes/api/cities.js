const express = require("express");
const router = express.Router();

const City = require("../../models/City");

// @route GET /api/cities
router.get("/", (req, res) => {
  //console.log("city api call");
  City.find()
    .populate("country")
    .then((cities) => res.json(cities))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
