"use strict"
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended:true});
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/'));




let city = "Lviv";
let apiKey = "&appid=c5807c2d3469d3aeec1bc8745a7f540a";
let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;


app.get("/", function(req, res ){

  res.render(__dirname + "/src/views/index.ejs", {id: 1000} );
  console.log(__dirname + "/src/views/index.ejs");


});





app.listen(3001, () => console.log("SERVER IS WORKING"));


