const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],(err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const admin = results[0];
      const isMatch = bcrypt.compareSync(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: admin.id },
        "secret123",
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
