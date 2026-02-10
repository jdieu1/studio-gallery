const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/photos", require("./routes/photos"));
app.use("/api/auth", require("./routes/auth"));
app.listen(5000, () => console.log("Server running on 5000"));
