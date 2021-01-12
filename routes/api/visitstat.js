const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/visitstat
router.get("/", (req, res) => {
  const { id } = req.query;
  let dayQueries = "";
  let monthQueries = "";

  for (let d = 1; d <= 7; d++) {
    dayQueries +=
      "SELECT dayname(start_at) AS month, " +
      "COUNT(id) AS count FROM presences " +
      `WHERE dayofweek(start_at) = ${d}; `;
  }
  for (let m = 1; m <= 12; m++) {
    monthQueries +=
      "SELECT monthname(start_at) AS month, " +
      "COUNT(id) AS count FROM presences " +
      `WHERE month(start_at) = ${m}; `;
  }
});

module.exports = router;
