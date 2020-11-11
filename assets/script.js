$(document).ready(function () {
    var today = moment().format("dddd, MMMM D, YYYY");
    console.log(today);
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
            .then(function (forData) {
                for (i = 5; i < 40; i+=8) {
                    var forDate = moment().add((i + 1), 'days').format("dddd, MMMM D");
                    $("#date-" + i).text(forDate);


                    // gets the data for noon for each day
                    var forIcon = forData.forcastDataRefArray[i].icon;
                    var forTemp = forData.forcastDataRefArray[i].temp;
                    var forHum = forData.forcastDataRefArray[i].humidity;
                    $("#icon-" + i).text(forIcon);
                    $("#temp-" + i).text(forTemp);
                    $("#hum-" + i).text(forHum);
                }
            })
    })



    // Displays Weather for current location on load of page















    // end ready function
});
