var express = require('express');
var app = express();

console.log("Hello world");

var assetsPath = __dirname + "/public"

app.use(function(req, res, next) {
  const {method, path, ip} = req;
  console.log(`${method} ${path} - ${ip}`);
  next();
})
app.use("/public", express.static(assetsPath));

app.get("/", function(req, res,next){
  var absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath);
});

app.get("/json", function(req, res,next){

  const messageStyle = process.env['MESSAGE_STYLE'];

  let messageLiteral = "Hello json";

  if( messageStyle === "uppercase"){
    messageLiteral = messageLiteral.toUpperCase();
  }

  res.json({"message": messageLiteral});

});

app.get("/now", function(req, res,next){
  req.time = new Date().toString();
  next();
}, function(req, res,next){
  res.json({"time": req.time});
});

































 module.exports = app;