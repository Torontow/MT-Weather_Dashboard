const APIkey = "&appid=8860494e1cee96c769ace725af0dcc0f";
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
const uvAPI = "https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid="
const forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?";
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
            let userLat = position.coords.latitude;
            let userLon = position.coords.longitude;
            let userWeatherUrl = weatherAPI + "lat=" + userLat + "&lon=" + userLon + "&units=metric" + APIkey;
            let userForecastUrl = forecastAPI + "lat=" + userLat + "&lon=" + userLon + "&units=metric" + APIkey;
            fetch(userWeatherUrl)
                .then(function (userWeatherResponse) {
                    return userWeatherResponse.json();
                }).then(function (userLocationWeatherData) {
                    let userWeatherData = userLocationWeatherData;
                    let userLocationName = userWeatherData.name;
                    let userLocationTemp = userWeatherData.main.temp;
                    let userLocationHumidity = userWeatherData.main.humidity;
                    let userLocationWind = userWeatherData.wind.speed;
                    let userLocationIcon = userWeatherData.weather[0].icon;
                    let userLocationIconURL = getWeatherIcon + userLocationIcon + ".png";

                    cityName.text(userLocationName);
                    cityTemp.text(userLocationTemp);
                    cityHum.text(userLocationHumidity);
                    cityWind.text(userLocationWind);

                });
            fetch(userForecastUrl)
                .then(function (userForecastResponse) {
                    return userForecastResponse.json();
                }).then(function (userLocationForecastData) {
                    let userForecastData = userLocationForecastData;
                    let userForecastArray = [];

                    for (let i = 5; i < 40; i += 8) {
                        let userForecastObject = {};
                        let userForecastDataDate = userForecastData.list[i].dt_txt;
                        let userForecastDate = new Date(userForecastDataDate).toLocaleDateString("en-US");
                        let userForecastTemp = userForecastData.list[i].main.temp;
                        let userForecastHumidity = userForecastData.list[i].humidity;
                        let userForecastIcon = userForecastData.list[i].weather[0].icon;

                        userForecastObject['list'] = {};
                        userForecastObject['list']['date'] = userForecastDate;
                        userForecastObject['list']['temp'] = userForecastTemp;
                        userForecastObject['list']['humidity'] = userForecastHumidity;
                        userForecastObject['list']['icon'] = userForecastIcon;
              
                        userForecastArray.push(userForecastObject);

                    }
                    
                    for (let j = 0; j < 5; j++) {
                        let userForecastArrayDate = userForecastArray[j].list.date;
                        let userForecastIconURL = getWeatherIcon + userForecastArray[j].list.icon + ".png";
                        let userForecastArrayTemp = userForecastArray[j].list.temp;
                        let userForecastArrayHumidity = userForecastArray[j].list.humidity;
                        
                        $("#date-" + j).text(userForecastArrayDate);
                        $("#temp-" + j).text(userForecastArrayTemp);
                        $("#icon-" + j).attr("src",userForecastIconURL);
                        $("#hum-" + j).text(userForecastArrayHumidity);
                        
                    }

                })



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
            geoAPI.getCurrentPosition(success, error);
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
    //         .then(function (userForecastData) {
    //             for (i = 5; i < 40; i += 8) {
    //                 var forDate = moment().add((i + 1), 'days').format("dddd, MMMM D");
    //                 $("#date-" + i).text(forDate);


    //                 // gets the data for noon for each day
    //                 var userForecastIcon = userForecastData.list[i].icon;
    //                 var userForecastTemp = userForecastData.list[i].temp;
    //                 var userForecastHumidity = userForecastData.list[i].humidity;
    //                 $("#icon-" + i).text(userForecastIcon);
    //                 $("#temp-" + i).text(userForecastTemp);
    //                 $("#hum-" + i).text(userForecastHumidity);
    //             }
    //         })
    // })



    // Displays Weather for current location on load of page















    // end ready function
});
