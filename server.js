// server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const DATA_FILE = "activities.json";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve index.html, app.js, etc.

// Initialize data file if not present
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Get all activities
app.get("/api/activities", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// Add new activity
app.post("/api/activities", (req, res) => {
  const newActivity = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.push({ ...newActivity, time: new Date().toISOString() });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "Activity added successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
