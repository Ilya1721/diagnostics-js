const express = require("express");
const router = express.Router();
const conn = require("../../config/db");

// @route GET /api/visitstat
router.get("/", (req, res) => {
  const { id } = req.query;
  const startQuery = "SET lc_time_names = 'uk_UA';";
  const hourQuery =
    "SELECT HOUR(start_at) AS name, id, " +
    "COUNT(*) AS count FROM presences GROUP BY name;";
  const dayQuery =
    "SELECT DAYNAME(start_at) AS name, id, " +
    "COUNT(*) AS count FROM presences GROUP BY name;";
  const monthQuery =
    "SELECT MONTHNAME(start_at) AS name, id, " +
    "COUNT(*) AS count FROM presences GROUP BY(name);";

  conn.query(startQuery, (err, results, fields) => {
    if (err) return res.status(400).json(err);
    conn.query(hourQuery, (err, results, fields) => {
      if (err) return res.status(400).json(err);
      const hours = results;
      conn.query(dayQuery, (err, results, fields) => {
        if (err) return res.status(400).json(err);
        const days = results;
        conn.query(monthQuery, (err, results, fields) => {
          if (err) return res.status(400).json(err);
          const months = results;
          return res.json({ hours, days, months });
        });
      });
    });
  });
});

module.exports = router;
