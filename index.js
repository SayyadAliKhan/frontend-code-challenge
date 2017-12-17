const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const port = process.env.PORT || 8081;
const RateLimit = require('express-rate-limit');

app.set('views', path.join(__dirname, 'src/app/client/html'));
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'src/app/client')));

app.get('/', function(err, resp){
  resp.render('index.html');
});

app.get('/getAdvertisment', function (err, resp) {
  request('https://api.mcmakler.de/v1/advertisements', function(err, res, body) {
    resp.send(JSON.parse(body).data);
  });
});

app.get('/serviceUnavailable', function(err, resp){

  resp.render('error.html');

});

app.listen(port, function(err){
  if(err)
    console.log("Something went wrong");
  else {
    console.log("Server running on Port: " + port);
  }

});
