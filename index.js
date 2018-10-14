"use strict"
const express = require("express");
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended:true});
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/'));


const apiKey = "&appid=c5807c2d3469d3aeec1bc8745a7f540a";
let url;
let cities = [];
let cityWeather = [];


app.get("/", function(req, res ){

  res.render(__dirname + "/src/views/index.ejs", {
    cities: cities
  }) 
});

app.post("/view", urlencodedParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
   
    url = "http://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + apiKey + "&units=metric";

    let promise = new Promise((resolve, reject) => {

    request(url, function(error, res, data){
      if (!error && res.statusCode == 404) {
        resolve(res.statusCode);
        console.log(res.statusCode + " Please, check city name.");
      }
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

app.delete("/delete/:index", function(req, res){

  let promise = new Promise((resolve, reject) => {
    let index = req.params.index;
    cities.splice(index, 1);
    resolve();
  });
  promise    
   .then(
      result => {
        res.send("Success");
      }
  );
 
});

app.listen(3001, () => console.log("SERVER IS WORKING"));


