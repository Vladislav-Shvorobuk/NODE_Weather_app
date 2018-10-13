"use strict"
const express = require("express");
const request = require('request');
const cheerio = require('cheerio');
let $;
const jquery = require('jquery');
const bootstrap = require('jquery');



const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended:true});

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/'));




let city = "Lviv";
let apiKey = "&appid=c5807c2d3469d3aeec1bc8745a7f540a";
let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey + "&units=metric";
let cities = [];
let cityWeather = [];


app.get("/", function(req, res ){

  res.render(__dirname + "/src/views/index.ejs", {
    cities: cities
  })
      
});

app.post("/view", urlencodedParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    url = "http://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + apiKey + "&units=metric";

    let promise = new Promise((resolve, reject) => {

    request(url, function(error, res, data){
      if (!error && res.statusCode == 200) {
        let obj = JSON.parse(data);
    
        cityWeather = [
          obj.name,
          obj.sys.country,  
          obj.weather[0].description,
          obj.main.temp,
          obj.main.pressure,
          obj.wind.speed
        ];
        cities.push(cityWeather);
        resolve(res.statusCode);
      }
    });
  });

  promise
  .then(
    result => {
      res.redirect("/");

    }
  
  );

 
    
})






  
app.listen(3001, () => console.log("SERVER IS WORKING"));


