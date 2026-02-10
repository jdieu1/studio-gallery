const express = require("express");
const router = express.Router();
const db = require("../config/db");
const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// GET all photos
// PUBLIC – user bose babona amafoto
router.get("/public", (req, res) => {
  db.query(
    "SELECT * FROM photos ORDER BY id DESC",(err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "DB error" });
      }
      res.json(results);
    }
  );
});

// Upload photo
router.post("/", upload.single("image"), (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "No image uploaded" });
    }

    const image = req.file.filename;

    db.query(
      "INSERT INTO photos (title, description, category, image) VALUES (?,?,?,?)",
      [title, description, category, image],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "DB error" });
        }
        res.json({ msg: "Photo uploaded" });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM photos WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "DB error" });
      }
      res.json({ msg: "Deleted" });
    }
  );
});


module.exports = router;
