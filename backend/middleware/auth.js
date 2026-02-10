const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
const token = req.headers.authorization;
if (!token) return res.status(401).send("No token");
try {
const decoded = jwt.verify(token, "SECRET_KEY");
req.admin = decoded;
next();
} catch {
res.status(401).send("Invalid token");
}
};