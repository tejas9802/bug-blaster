require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bugRoute = require("./routes/bug.route.js");
const app = express();

app.use(express.json()); //adds middleware to parse json requests
app.use(express.urlencoded({ extended: false })); // to parse url-encoded data

app.use("/api", bugRoute);
const _dirName = path.resolve();

console.log("node env", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirName, "/frontend/build")));

  app.use((req, res, next) => {
    res.sendFile(path.resolve(_dirName, "frontend", "build", "index.html"));
  });
}

// --------------------
// Health Check Endpoint to keep app awake on render
// --------------------
app.get("/healthz", async (req, res) => {
  try {
    // Check MongoDB connection
    const admin = mongoose.connection.db.admin();
    await admin.ping();
    res.status(200).send("OK"); // server & DB are fine
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).send("Database connection failed");
  }
});

// to connect to mongoDB database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected !!!");
    app.listen(process.env.PORT, () => {
      console.log("Server running on port:", process.env.PORT);
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
