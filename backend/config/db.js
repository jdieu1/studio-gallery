const mysql = require("mysql2");
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "studio_portfolio"
});
db.connect(err => {
if (err) throw err;
console.log("DB connected");
});
module.exports = db;