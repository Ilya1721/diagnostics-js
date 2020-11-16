const express = require("express");
const router = express.Router();
const config = require("config");

// @route GET /api/aws/config
router.get("/config", (req, res) => {
  res.json({
    aws_access_key_id: config.get("aws_access_key_id"),
    aws_secret_access_key: config.get("aws_secret_access_key"),
  });
});

module.exports = router;
