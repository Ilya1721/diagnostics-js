const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route GET /api/users
// @desc get all users that are doctors
// @access public
router.get("/", (req, res) => {
  const { search, category } = req.query;
  if (search) {
    conn.query(
      "SELECT e.id as employee_id, e.last_name, e.first_name, e.father_name, " +
        "e.street, e.house, e.flat, e.phone_number, e.image, e.about, " +
        "d.name AS department_name, c.name AS clinic_name, " +
        "j.name AS job_name FROM employees e INNER JOIN departments d ON " +
        "e.department_id = d.id INNER JOIN clinics c ON d.clinic_id = c.id " +
        "INNER JOIN jobs j ON e.job_id = j.id " +
        `WHERE ${category} LIKE "%${search}%"; `,
      (err, results, fields) => {
        if (err) return res.status(400).json(err);
        return res.json(results);
      }
    );
  } else {
    conn.query(
      "SELECT e.id as employee_id, e.last_name, e.first_name, e.father_name, " +
        "e.street, e.house, e.flat, e.phone_number, e.image, e.about, " +
        "d.name AS department_name, c.name AS clinic_name, " +
        "j.name AS job_name FROM employees e INNER JOIN departments d ON " +
        "e.department_id = d.id INNER JOIN clinics c ON d.clinic_id = c.id " +
        "INNER JOIN jobs j ON e.job_id = j.id",
      (err, results, fields) => {
        if (err) return res.status(400).json(err);
        return res.json(results);
      }
    );
  }
});

// @route POST /api/users
// @desc register new user
// @access public
router.post("/", (req, res) => {
  const data = req.body;

  if (!{ ...data }) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const email = data.email;

  conn.query("SELECT email from users", (err, results, fields) => {
    if (err) res.status(400).json(err);
    if (results.includes(email)) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      conn.query(
        "INSERT INTO employees(city_id, job_id, department_id, room_id," +
          "about, last_name, first_name, father_name, street, house, flat, " +
          "phone_number, image) VALUES " +
          `(${data.city}, ${data.job}, ` +
          `${data.department}, ${data.room}, "${data.about}", ` +
          `"${data.lastName}", "${data.firstName}", ` +
          `"${data.fatherName}", "${data.street}", ` +
          `"${data.house}", "${data.flat}", ` +
          `"${data.phoneNumber}", "${data.image}");`,
        (err, results, fields) => {
          if (err) return res.status(400).json(err);
          const employee_id = results.insertId;
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(data.password, salt, (err, hash) => {
              if (err) res.status(400).json(err);
              conn.query(
                "INSERT INTO users(employee_id, login, email, password) " +
                  "VALUES " +
                  `(${employee_id}, "${data.login}", "${data.email}", ` +
                  `"${hash}");`,
                (err, results, fields) => {
                  if (err) return res.status(400).json(err);
                  jwt.sign(
                    { id: results.insertId },
                    config.get("jwtSecret"),
                    { expiresIn: 36000 },
                    (err, token) => {
                      if (err) return res.status(400).json(err);
                      return res.json({
                        token,
                        user: {
                          id: results.insertId,
                          login: data.login,
                          email: data.email,
                        },
                      });
                    }
                  );
                }
              );
            });
          });
        }
      );
    }
  });
});

// @route GET /api/users/id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  conn.query(
    "SELECT e.last_name AS lastName, e.first_name AS firstName, " +
      "e.father_name AS fatherName, e.street, e.house, " +
      "e.flat, e.phone_number AS phoneNumber, e.image, " +
      "c.name AS city, c.id AS cityId, j.name AS job, j.id AS jobId, " +
      "d.name AS department, d.id AS departmentId, e.about, " +
      "cl.name AS clinic, cl.id AS clinicId, " +
      "u.login, u.email, co.id AS countryId, co.name AS country, " +
      "u.id, r.number AS room, r.id AS roomId FROM employees e " +
      "INNER JOIN cities c ON e.city_id = c.id " +
      "INNER JOIN countries co ON c.country_id = co.id " +
      "INNER JOIN jobs j ON e.job_id = j.id " +
      "INNER JOIN departments d ON e.department_id = d.id " +
      "INNER JOIN clinics cl ON d.clinic_id = cl.id " +
      "INNER JOIN rooms r ON e.room_id = r.id " +
      "INNER JOIN users u ON u.employee_id = e.id " +
      `WHERE u.id = ${id};`,
    (err, results, fields) => {
      if (err)
        return res.status(400).json({ msg: "GET USER ERROR", error: err });
      return res.json([results[0]]);
    }
  );
});

module.exports = router;
