var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));

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

app.get("/:word/echo", function(req, res,next){
  const word = req.params.word
  res.json({"echo": word});
});

const nameGETHandler = (req, res,next) => {
  const {first, last} = req.query;
  res.json({"name": `${first} ${last}`});
}

const namePOSTHandler = (req, res,next) => {
  const {first, last} = req.body;
  res.json({"name": `${first} ${last}`});
}

app.route("/name").get(nameGETHandler).post(namePOSTHandler)
































 module.exports = app;