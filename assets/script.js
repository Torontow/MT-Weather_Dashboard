$(document).ready(function () {

    // var currentUrl = "api.openweathermap.org/data/2.5/weather?q={city name}&appid=8860494e1cee96c769ace725af0dcc0f";
    // var fiveUrl = "api.openweathermap.org/data/2.5/forecast?q={city name}&appid=8860494e1cee96c769ace725af0dcc0f";

    // $("#searchBtn").on("click", getLocation);

    // gets current location for initial weather upload
    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(userWeatherUrl);
    //     }
    // }

    // function userWeatherUrl(position) {
    //     var latlon = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
    //     var locationUrl = ("api.openweathermap.org/data/2.5/weather?" + latlon + "&appid=8860494e1cee96c769ace725af0dcc0f");
    //     return locationUrl;
    // }

    // provides the weather for a user-clicked city
    var cityTemp
    var cityHum
    var cityWind
    $(".cityBtn").on("click", function () {
        var cityName = $(this).attr("id");
        $("#cityName").text(cityName);

        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=8860494e1cee96c769ace725af0dcc0f")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                cityTemp = data.main.temp;
                cityHum = data.main.humidity;
                cityWind = data.wind.speed;
            $("#main-temp").text(cityTemp);
            $("#main-hum").text(cityHum);
            $("#main-wind").text(cityWind);
            
            })
        
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=8860494e1cee96c769ace725af0dcc0f")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

            })
    })



    // Displays Weather for current location on load of page















    // end ready function
});
