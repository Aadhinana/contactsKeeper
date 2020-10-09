const express = require("express");
const app = express();
const path = require("path");

const PORT = 5000;

// Connect to MongoDB
require("./config/db");

// Allow for bodyparser in req
app.use(express.json({ extended: false }));

// Static assest in PROD.
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Routes definitions
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));

// Listen to PORT
app.listen(PORT, () => console.log(`Server has started listening to ${PORT}`));
