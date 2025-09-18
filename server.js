// server.js
const express = require("express");
const app = express();
// import cors from 'cors';

// var cors = require('cors');
// app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


// Root endpoint
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running 🚀");
});

app.use(express.static('public'));

// Without date param -> return current time
app.get("/api", (req, res) => {
  let date = new Date();
  res.sendFile(__dirname + '/views/index.html');
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