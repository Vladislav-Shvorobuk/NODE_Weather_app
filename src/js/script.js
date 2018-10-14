"use strict";

$(function(){

    $('.container').css('min-height', $(window).height());
    
// get geolocation of the user and insert weather data to the static block of page
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
           
            $.get( "https://api.openweathermap.org/data/2.5/weather?lat=" + 
                  position.coords.latitude + "&lon=" + position.coords.longitude +
                 "&appid=c5807c2d3469d3aeec1bc8745a7f540a&units=metric", function(obj) {
        
               $("#userCity").text(obj.name + ", " +  obj.sys.country);
               $("#userCityWeather").text(obj.weather[0].description);
               $("#userCityTemp").html(parseInt(obj.main.temp) + " C<sup>o</sup>");
               $("#userCityPressure").html(obj.main.pressure + " hPa");
               $("#userCitytWind").html( obj.wind.speed + " mps");

            });
        });
      } else {
       console.log("geolocation is not supported");
      }


    $(".delete").on("click", function(event){
            let index = $(event.target ).attr("id");

            $.ajax({
                type: "DELETE",
                url: "/delete/" + index,
                success: function(res){
                    window.location.href="/";
                }, error: function(err) {
                    console.log(err);
                }
            });
    });

});
 


    
