// server.js
const express = require("express");
const app = express();

// Root endpoint
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running 🚀");
});

// Without date param -> return current time
app.get("/api", (req, res) => {
  let date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// With date param
app.get("/api/:date", (req, res) => {
  let dateParam = req.params.date;

  // Check if it's a number (unix timestamp)
  let date =
    /^\d+$/.test(dateParam) 
      ? new Date(parseInt(dateParam)) 
      : new Date(dateParam);

  // Handle invalid dates
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on provided port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);