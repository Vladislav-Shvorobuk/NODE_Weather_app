"use strict"
const express = require("express");
const request = require('request');
const cheerio = require('cheerio');
let $;
const jquery = require('jquery');



const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended:true});

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/'));




let city = "Lviv";
let apiKey = "&appid=c5807c2d3469d3aeec1bc8745a7f540a";
let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;
let cityWeather = {};

request(url, function(error, res, data){
  if (!error && res.statusCode == 200) {
    let obj = JSON.parse(data);
    // console.log(obj);
    console.log(typeof obj.wind.speed);
    cityWeather = {
      wind:{
        speed : obj.wind.speed,
        deg : obj.wind.deg 
      },
      name : obj.name
    }
    

  }


});


app.get("/", function(req, res ){

  res.render(__dirname + "/src/views/index.ejs", {
    cityWeather: cityWeather
  
  })
      
});


  
// request('http://localhost:3001/', function (error, response, html) {
//   if (!error && response.statusCode == 200) {
//     var $ = cheerio.load(html);
//     console.log(" WORK - " + $ + "  !!!!!!!!!");
//     };
// });

  


app.listen(3001, () => console.log("SERVER IS WORKING"));


