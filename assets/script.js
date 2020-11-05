$(document).ready(function(){
// Weather Header
    var header = $("<header>").addClass("").attr("id","header").html("<h1>Weather Dashboard</h1>");
    $("#container").append(header);

    var row = $("<main>").addClass("row container-fluid").attr("id","main");
    $("#container").append(row);
// Search Panel
    var searchPanel = $("<div>").addClass("col-4").attr("id","searchPanel").html("<h4>Search for a City:</h4>");
    var searchInput = $("<div>").addClass("col-4").attr("id","searchInput").html("<input type='text' placeholder='City'></input>");
    
    var cities = ["Vancouver","Calgary","Regina","Winnipeg","Toronto","Montreal","Halifax","St. John's"];
    var searchClick = $("<ul>").addClass("col-4 list-group").attr("id","searchClick");
    for (i=0; i<cities.length; i++){
        var city = $("<a>").addClass("list-group-item list-group-action-item").attr("id",i).text(cities[i]);
        searchClick.append(city);
    }
    $("#container").append(searchPanel).append(searchInput).append(searchClick);
// End Search Panel

// Main Panel
    var mainPanel = $("<div>").addClass("col-8").attr("id","mainPanel").html("<h2>City</h2>");
    $("#container").append(mainPanel);
// End Main Panel

// 5-day Panel
    var fiveDayPanel = $("<section>").addClass("row").attr("id","fiveDayPanel").html("<h3>5-Day Forecast</h3>");
    mainPanel.append(fiveDayPanel);
    var forecastRow = $("<div>").addClass("row").attr("id","row");

    var dayData = ["1","2","3","4","5"];
    for (j=0; j<dayData.length;j++){
        var dayPanel = $("<div>").addClass("dayPanel").attr("id",i).text("My index is "+ dayData[i]);
        forecastRow.append(dayPanel);  
    };
    mainPanel.append(forecastRow);
// End 5-day Panel















// end ready function
});
