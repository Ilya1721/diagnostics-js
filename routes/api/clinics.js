const express = require("express");
const router = express.Router();

const Clinic = require("../../models/Clinic");

// @route GET /api/clinics
router.get("/", (req, res) => {
  Clinic.find()
    .populate("city")
    .populate("clinicType")
    .then((clinics) => res.json(clinics))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
