var express = require('express');
var app = express();

console.log("Hello world");

app.get("/", function(req, res,next){
  var absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath);
});


































 module.exports = app;