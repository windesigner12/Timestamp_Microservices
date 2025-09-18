// // server.js
// const express = require("express");
// const app = express();
// // import cors from 'cors';

// // var cors = require('cors');
// // app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Timestamp Microservice is running 🚀");
// });

// app.use(express.static('public'));

// // Without date param -> return current time
// app.get("/api", (req, res) => {
//   let date = new Date();
//   res.sendFile(__dirname + '/views/index.html');
// });

// // With date param
// app.get("/api/:date", (req, res) => {
//   let dateParam = req.params.date;

//   // Check if it's a number (unix timestamp)
//   let date =
//     /^\d+$/.test(dateParam) 
//       ? new Date(parseInt(dateParam)) 
//       : new Date(dateParam);

//   // Handle invalid dates
//   if (date.toString() === "Invalid Date") {
//     return res.json({ error: "Invalid Date" });
//   }

//   res.json({
//     unix: date.getTime(),
//     utc: date.toUTCString(),
//   });
// });

// // Listen on provided port
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// }
// );

const express = require("express");
const app = express();

// Root endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // If no date is provided → use current time
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Check if the date is a number (timestamp)
  if (!isNaN(date)) {
    date = parseInt(date); // convert to number
  }

  // Try to create Date object
  const parsedDate = new Date(date);

  // If invalid date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Valid date → return unix & utc
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
