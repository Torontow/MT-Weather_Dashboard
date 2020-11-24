const APIkey = "&appid=8860494e1cee96c769ace725af0dcc0f";
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
const uvAPI = "https://api.openweathermap.org/data/2.5/uvi?";
const forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?";
const units = "&units=metric";
const geoAPI = navigator.geolocation;
const today = moment().format("dddd, MMMM D, YYYY");
const getWeatherIcon = "http://openweathermap.org/img/wn/";
const cityName = $("#cityName");
const cityTemp = $("#main-temp");
const cityHum = $("#main-hum");
const cityWind = $("#main-wind");
const cityUv = $("#main-uv");
const cityIcon = $("#main-icon");
const searchHistory = $("search-history");
var searchHistoryArr = [];
var citySearch;


$(document).ready(function () {

    init();
    displayHistory();

    function init() {
        userWeatherUrl();
        search();
        clearHistory();
    }

    function search() {
        $("#search-button").on("click", function () {
            citySearch = $("#search-input").val().trim();

            if (citySearch === "") {
                return;
            }
            $("#search-input").val("");
            searchWeather(citySearch);
        })
    }

    // Gets the weather and forecast for user-input city search

    function searchWeather(searchCity) {
        let searchWeatherURL = weatherAPI + "q=" + searchCity + units + APIkey;

        fetch(searchWeatherURL)
            .then(function (searchWeatherResponse) {
                return searchWeatherResponse.json();
            }).then(function (searchWeatherData) {
                // Displays searched city current weather in main panel
                let searchWeatherResponse = searchWeatherData;
                let searchCityName = searchWeatherResponse.name;
                let searchCityTemp = Math.floor(searchWeatherResponse.main.temp);
                let searchCityHumidity = searchWeatherResponse.main.humidity;
                let searchCityWind = searchWeatherResponse.wind.speed;
                let searchCityIcon = searchWeatherResponse.weather[0].icon;
                let searchCityIconURL = getWeatherIcon + searchCityIcon + ".png";

                cityName.text(searchCityName);
                cityTemp.text(searchCityTemp);
                cityHum.text(searchCityHumidity);
                cityWind.text(searchCityWind);
                cityIcon.attr("src", searchCityIconURL);

                searchHistory(searchCityName);

                // Displays searched city current UV index in main panel
                let searchLat = searchWeatherData.coord.lat;
                let searchLon = searchWeatherData.coord.lon;
                let searchUvUrl = uvAPI + "lat=" + searchLat + "&lon=" + searchLon + units + APIkey;

                fetch(searchUvUrl)
                    .then(function (searchUvResponse) {
                        return searchUvResponse.json();
                    })
                    .then(function (citySearchUvData) {
                        let searchUvData = citySearchUvData;
                        let searchUvIndex = searchUvData.value;
                        cityUv.text(searchUvIndex);

                        if (searchUvIndex < 3) {
                            $('.uvIndex-badge').css('background-color', 'green');
                        } else if (searchUvIndex < 6) {
                            $('.uvIndex-badge').css('background-color', 'yellow');
                        } else if (searchUvIndex < 8) {
                            $('.uvIndex-badge').css('background-color', 'orange');
                        } else if (searchUvIndex < 10) {
                            $('.uvIndex-badge').css('background-color', 'red');
                        } else {
                            $('.uvIndex-badge').css('background-color', 'purple').css("color", "white");
                        }
                    })

                // Displays searched city 5-day forecast in forecast panels
                let searchCityForecastUrl = forecastAPI + "q=" + citySearch + units + APIkey;

                fetch(searchCityForecastUrl)
                    .then(function (searchForecastResponse) {
                        return searchForecastResponse.json();
                    }).then(function (searchCityForecastData) {

                        let searchForecastData = searchCityForecastData;
                        let searchForecastArray = [];

                        for (let k = 5; k < 40; k += 8) {
                            let searchForecastObject = {};
                            let searchForecastDataDate = searchForecastData.list[k].dt_txt;
                            let searchForecastDate = new Date(searchForecastDataDate).toLocaleDateString("en-US");
                            let searchForecastTemp = Math.floor(searchForecastData.list[k].main.temp);
                            let searchForecastHumidity = searchForecastData.list[k].main.humidity;
                            let searchForecastIcon = searchForecastData.list[k].weather[0].icon;

                            searchForecastObject['list'] = {};
                            searchForecastObject['list']['date'] = searchForecastDate;
                            searchForecastObject['list']['temp'] = searchForecastTemp;
                            searchForecastObject['list']['humidity'] = searchForecastHumidity;
                            searchForecastObject['list']['icon'] = searchForecastIcon;

                            searchForecastArray.push(searchForecastObject);

                        }
                        for (let m = 0; m < 5; m++) {
                            let searchForecastArrayDate = searchForecastArray[m].list.date;
                            let searchForecastIconURL = getWeatherIcon + searchForecastArray[m].list.icon + ".png";
                            let searchForecastArrayTemp = searchForecastArray[m].list.temp;
                            let searchForecastArrayHumidity = searchForecastArray[m].list.humidity;

                            $("#date-" + m).text(searchForecastArrayDate);
                            $("#temp-" + m).text(searchForecastArrayTemp);
                            $("#icon-" + m).attr("src", searchForecastIconURL);
                            $("#hum-" + m).text(searchForecastArrayHumidity);

                        }

                    })


            });
    }

    // Displays weather for user's location
    function userWeatherUrl() {

        function success(position) {
            let userLat = position.coords.latitude;
            let userLon = position.coords.longitude;
            let userWeatherUrl = weatherAPI + "lat=" + userLat + "&lon=" + userLon + units + APIkey;
            let userForecastUrl = forecastAPI + "lat=" + userLat + "&lon=" + userLon + units + APIkey;
            let userUvUrl = uvAPI + "lat=" + userLat + "&lon=" + userLon + units + APIkey;

            // Displays user's weather in main panel
            fetch(userWeatherUrl)
                .then(function (userWeatherResponse) {
                    return userWeatherResponse.json();
                }).then(function (userLocationWeatherData) {
                    let searchWeatherResponse = userLocationWeatherData;
                    let searchCityName = searchWeatherResponse.name;
                    let searchCityTemp = Math.floor(searchWeatherResponse.main.temp);
                    let searchCityHumidity = searchWeatherResponse.main.humidity;
                    let searchCityWind = searchWeatherResponse.wind.speed;
                    let searchCityIcon = searchWeatherResponse.weather[0].icon;
                    let searchCityIconURL = getWeatherIcon + searchCityIcon + ".png";

                    cityName.text(searchCityName);
                    cityTemp.text(searchCityTemp);
                    cityHum.text(searchCityHumidity);
                    cityWind.text(searchCityWind);
                    cityIcon.attr("src", searchCityIconURL);

                });
            // Displays user's UV index in main panel    
            fetch(userUvUrl)
                .then(function (userUvResponse) {
                    return userUvResponse.json();
                })
                .then(function (userLocationUvData) {
                    let searchUvData = userLocationUvData;
                    let userUvIndex = searchUvData.value;
                    cityUv.text(userUvIndex);

                    if (userUvIndex < 3) {
                        $('.uvIndex-badge').css('background-color', 'green');
                    } else if (uvIndex < 6) {
                        $('.uvIndex-badge').css('background-color', 'yellow');
                    } else if (uvIndex < 8) {
                        $('.uvIndex-badge').css('background-color', 'orange');
                    } else if (uvIndex < 10) {
                        $('.uvIndex-badge').css('background-color', 'red');
                    } else {
                        $('.uvIndex-badge').css('background-color', 'purple');
                    }
                })

            // Displays user's 5-day forecast in forecast panels
            fetch(userForecastUrl)
                .then(function (searchForecastResponse) {
                    return searchForecastResponse.json();
                }).then(function (searchCityForecastData) {

                    let searchForecastData = searchCityForecastData;
                    let searchForecastArray = [];

                    for (let i = 5; i < 40; i += 8) {
                        let searchForecastObject = {};
                        let searchForecastDataDate = searchForecastData.list[i].dt_txt;
                        let searchForecastDate = new Date(searchForecastDataDate).toLocaleDateString("en-US");
                        let searchForecastTemp = Math.floor(searchForecastData.list[i].main.temp);
                        let searchForecastHumidity = searchForecastData.list[i].main.humidity;
                        let searchForecastIcon = searchForecastData.list[i].weather[0].icon;

                        searchForecastObject['list'] = {};
                        searchForecastObject['list']['date'] = searchForecastDate;
                        searchForecastObject['list']['temp'] = searchForecastTemp;
                        searchForecastObject['list']['humidity'] = searchForecastHumidity;
                        searchForecastObject['list']['icon'] = searchForecastIcon;

                        searchForecastArray.push(searchForecastObject);

                    }
                    for (let j = 0; j < 5; j++) {
                        let searchForecastArrayDate = searchForecastArray[j].list.date;
                        let searchForecastIconURL = getWeatherIcon + searchForecastArray[j].list.icon + ".png";
                        let searchForecastArrayTemp = searchForecastArray[j].list.temp;
                        let searchForecastArrayHumidity = searchForecastArray[j].list.humidity;

                        $("#date-" + j).text(searchForecastArrayDate);
                        $("#temp-" + j).text(searchForecastArrayTemp);
                        $("#icon-" + j).attr("src", searchForecastIconURL);
                        $("#hum-" + j).text(searchForecastArrayHumidity);

                    }

                })



        }
        // In case location can not be used
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

    function searchHistory(searchCityName) {
        var searchHistoryObj = {};

        if (searchHistoryArr.length === 0) {
            searchHistoryObj['city'] = searchCityName;
            searchHistoryArr.push(searchHistoryObj);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
        } else {
            var checkHistory = searchHistoryArr.find(
                ({ city }) => city === searchCityName
            );

            if (searchHistoryArr.length < 5) {
                if (checkHistory === undefined) {
                    searchHistoryObj['city'] = searchCityName;
                    searchHistoryArr.push(searchHistoryObj);
                    localStorage.setItem(
                        'searchHistory',
                        JSON.stringify(searchHistoryArr)
                    );
                }
            } else {
                if (checkHistory === undefined) {
                    searchHistoryArr.shift();
                    searchHistoryObj['city'] = searchCityName;
                    searchHistoryArr.push(searchHistoryObj);
                    localStorage.setItem(
                        'searchHistory',
                        JSON.stringify(searchHistoryArr)
                    );
                }
            }
        }
        $('#search-history').empty();
        displayHistory();
    }

    function displayHistory() {
        var getLocalSearchHistory = localStorage.getItem('searchHistory');
        var localSearchHistory = JSON.parse(getLocalSearchHistory);
    
        if (getLocalSearchHistory === null) {
          createHistory();
          getLocalSearchHistory = localStorage.getItem('searchHistory');
          localSearchHistory = JSON.parse(getLocalSearchHistory);
        }
    
        for (var i = 0; i < localSearchHistory.length; i++) {
          var historyLi = $('<li>');
          historyLi.addClass('list-group-item');
          historyLi.text(localSearchHistory[i].city);
          $('#search-history').prepend(historyLi);
        }
        return (searchHistoryArr = localSearchHistory);
    }
    function createHistory() {
        searchHistoryArr.length = 0;
        localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
      }
    function clearHistory() {
        $('#clear-button').on('click', function() {
          $('#search-history').empty();
        //   $('#search-history-container').hide();
          localStorage.removeItem('searchHistory');
        //   createHistory();
        });
      }















    // end ready function
});
