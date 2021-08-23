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
    if(hours==0){
        hours=12;
    }
    else if(hours>=12){
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


// Fetch data from API
const locationName = document.getElementById('location');
const temperature = document.getElementById('temp');
const tempMinMax = document.getElementById('tempMinMax');

const sendData = (realData) => {
    let cityName = realData.name;
    let countryName = realData.sys.country;
    let temp = (realData.main.temp -273).toFixed(2);
    let minTemp = (realData.main.temp_min -273).toFixed(2);
    let maxTemp = (realData.main.temp_max -273).toFixed(2);

    locationName.innerText = `${cityName} | ${countryName}`;
    temperature.innerText = `${temp}°C`;
    tempMinMax.innerText = `${minTemp}°C  |  ${maxTemp}°C`;
};

const getData = async () => {
    const api = "http://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=286b38672a6e470917475581312f0907";
    try {
       let data = await fetch(api); 
       realData = await data.json();
       sendData(realData);
    } catch (error) {
        
    }
};

getData();