const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/visitstat
router.get("/", (req, res) => {
  const { id } = req.query;
  const startQuery = "SET lc_time_names = 'uk_UA';";
  let dayQueries = "";
  let monthQueries = "";

  for (let d = 1; d <= 7; d++) {
    dayQueries +=
      "SELECT dayname(start_at) AS name, id, " +
      "COUNT(id) AS count FROM presences " +
      `WHERE dayofweek(start_at) = ${d}; `;
  }
  for (let m = 1; m <= 12; m++) {
    monthQueries +=
      "SELECT monthname(start_at) AS name, id, " +
      "COUNT(id) AS count FROM presences " +
      `WHERE month(start_at) = ${m}; `;
  }

  conn.query(startQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    conn.query(dayQueries, (err, results, fields) => {
      if (err) return res.status(400).json(err);
      let days = [];
      if (results.length > 1) {
        for (const result of results) {
          days.push(...result);
        }
      } else {
        for (const result of results) {
          days.push(result);
        }
      }
      conn.query(monthQueries, (err, results, fields) => {
        if (err) return res.status(400).json(err);
        let months = [];
        if (results.length > 1) {
          for (const result of results) {
            months.push(...result);
          }
        } else {
          for (const result of results) {
            months.push(...result);
          }
        }
        return res.json({ days, months });
      });
    });
  });
});

module.exports = router;
