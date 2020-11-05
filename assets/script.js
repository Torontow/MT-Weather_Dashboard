$(document).ready(function(){



// 5-day Panel

    var dayData = ["1","2","3","4","5"];
    for (i=0; i<dayData.length;i++){
        var dayPanel = $("<div>").addClass("dayPanel").attr("id",i).text("My index is "+ dayData[i]);
        console.log(dayPanel);
        $("#daysPanel").append(dayPanel);  
    };
    // $("#fiveDaysPanel").append(dayPanel);
// End 5-day Panel















// end ready function
});
