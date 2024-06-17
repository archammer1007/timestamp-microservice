// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//if /api is called with nothing after, return the current date and time
app.get("/api/", function(req, res){
  var now = Date.now();
  var nowUTC = new Date(now).toUTCString();
  res.json({ unix: now, utc: nowUTC })
})

app.get("/api/:date?", function(req, res){
    let date = req.params.date;
    //check if valid date string
    if (!isNaN(new Date(date))){
      res.json({ unix: Date.parse(new Date(date)), utc: new Date(date).toUTCString() });
    }
    //check if unix code (ie is a number)
    else if (!isNaN(date)){
      res.json({ unix: Number(date), utc: new Date(Number(date)).toUTCString() });
    }
    //if is neither, give error
    else {
      res.json({ error: "Invalid Date" })
    }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
