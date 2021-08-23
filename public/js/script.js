const currentDate = document.getElementById("date");

let weatherCondition = document.getElementById("weather-condition");

const tempStatus = "Clouds";

var currentTime = new Date(); // Getting the date,time,day

//Get the day
const getCurrentDay = () => {

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var day = weekday[currentTime.getDay()];
    return day;
}

// Get the date, month, year and time
const getCurrentTime = () => {
    var months = [
        "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var month = months[currentTime.getMonth()];
    var date = currentTime.getDate();
    var year = currentTime.getFullYear();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    
    let period = "AM";
    if(hours>11){
        period="PM";
        if(hours>12){
            hours-=12;
        }
    }

    if(minutes<10){
        minutes = `0${minutes}`;
    }

    return `${month} ${date}, ${year} | ${hours}:${minutes} ${period}`;
}
currentDate.innerHTML = `${getCurrentDay()} ${getCurrentTime()}`;