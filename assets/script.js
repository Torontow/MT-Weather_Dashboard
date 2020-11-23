const APIkey = "&appid=8860494e1cee96c769ace725af0dcc0f";
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
const uvAPI = "https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid="
const forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=";
const geoAPI = navigator.geolocation;
const today = moment().format("dddd, MMMM D, YYYY");
const getWeatherIcon = "http://openweathermap.org/img/wn/";
const cityName = $("#cityName");
const cityTemp = $("#main-temp");
const cityHum = $("#main-hum");
const cityWind = $("#main-wind");
const cityUv = $("#main-uv");


$(document).ready(function () {

    init();

    function init() {
        userWeatherUrl();
    }


    // $("#searchBtn").on("click", getLocation);

    // gets current location for initial weather upload



    function userWeatherUrl() {

        function success(position) {
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;
            var userLocationUrl = weatherAPI + "lat=" + userLat + "&lon=" + userLon + "&units=metric" + APIkey;
            fetch(userLocationUrl)
                .then(function (response) {
                    return response.json();
                }).then(function (userLocationResponse) {
                    let userLocationData = userLocationResponse;
                    let userLocationName = userLocationData.name;
                    let userLocationTemp = userLocationData.main.temp;
                    let userLocationHumidity = userLocationData.main.humidity;
                    let userLocationWind = userLocationData.wind.speed;
                    let userLocationIcon = userLocationData.weather[0].icon;
                    let userLocationIconURL = getWeatherIcon + userLocationIcon + ".png";

                    cityName.text(userLocationName);
                    cityTemp.text(userLocationTemp);
                    cityHum.text(userLocationHumidity);
                    cityWind.text(userLocationWind);

                });

        }

        function error(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    cityName.text("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    cityName.text("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    cityName.text("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    cityName.text("An unknown error occurred.");
                    break;
            }
        }
        if (!geoAPI) {
            cityName.text(
                'Geolocation is not supported by your browser'
            );
        } else {
            geoAPI.getCurrentPosition(success,error);
        }

    }

    // provides the weather for a user-clicked city
    // var cityTemp
    // var cityHum
    // var cityWind
    // $(".cityBtn").on("click", function () {
    //     var cityName = $(this).attr("id");
    //     $("#cityName").text(cityName);

    //     fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=8860494e1cee96c769ace725af0dcc0f")
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             cityTemp = data.main.temp;
    //             cityHum = data.main.humidity;
    //             cityWind = data.wind.speed;
    //             $("#main-temp").text(cityTemp);
    //             $("#main-hum").text(cityHum);
    //             $("#main-wind").text(cityWind);

    //         })
    //     fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=8860494e1cee96c769ace725af0dcc0f")
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (forData) {
    //             for (i = 5; i < 40; i += 8) {
    //                 var forDate = moment().add((i + 1), 'days').format("dddd, MMMM D");
    //                 $("#date-" + i).text(forDate);


    //                 // gets the data for noon for each day
    //                 var forIcon = forData.forcastDataRefArray[i].icon;
    //                 var forTemp = forData.forcastDataRefArray[i].temp;
    //                 var forHum = forData.forcastDataRefArray[i].humidity;
    //                 $("#icon-" + i).text(forIcon);
    //                 $("#temp-" + i).text(forTemp);
    //                 $("#hum-" + i).text(forHum);
    //             }
    //         })
    // })



    // Displays Weather for current location on load of page















    // end ready function
});
