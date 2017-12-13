const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const port = process.env.PORT || 8081;

app.set('views', path.join(__dirname, 'client/html'));
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(err, resp){

request('https://api.mcmakler.de/v1/advertisements', function(err, resp, body) {

  console.log(JSON.parse(body));
});

  //resp.render('index.html');

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
