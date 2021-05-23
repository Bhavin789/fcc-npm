var express = require('express');
var app = express();

console.log("Hello world");

var assetsPath = __dirname + "/public"
app.use("/public", express.static(assetsPath));

app.get("/", function(req, res,next){
  var absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath);
});


































 module.exports = app;