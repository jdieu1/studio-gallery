const bcrypt = require("bcryptjs");
const db = require("./config/db");

const email = "studio@gmail.com";
const password = "admin123";

const hash = bcrypt.hashSync(password, 10);

db.query(
  "INSERT INTO admin (email, password) VALUES (?,?)",
  [email, hash],
  (err) => {
    if (err) throw err;
    console.log("✅ Admin created");
    process.exit();
  }
);
