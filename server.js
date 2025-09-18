// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// serve static files
app.use(express.static('public'));

// root: serve the front page
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// simple example endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Helper to build response
function buildSuccessResponse(dateObj) {
  return {
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  };
}

// API: return current time when no date param is provided
app.get('/api', function (req, res) {
  const now = new Date();
  res.json(buildSuccessResponse(now));
});

// API: parse the date parameter (handles numeric timestamps and date strings)
app.get('/api/:date', function (req, res) {
  const dateParam = req.params.date;

  let dateObj;

  // If it's all digits, treat as a timestamp
  if (/^\d+$/.test(dateParam)) {
    // parse as number
    const num = Number(dateParam);

    // If it's 10 digits -> seconds, convert to milliseconds
    if (dateParam.length === 10) {
      dateObj = new Date(num * 1000);
    } else {
      // Assume milliseconds (or other lengths)
      dateObj = new Date(num);
    }
  } else {
    // Otherwise, try to parse as date string
    dateObj = new Date(dateParam);
  }

  // If invalid date, return error object
  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Valid -> return unix (ms) and utc string
  res.json(buildSuccessResponse(dateObj));
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
