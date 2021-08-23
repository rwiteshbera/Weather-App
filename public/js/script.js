const boxBg = document.getElementById("box-bg");
const textArea = document.getElementById("text-area"); // Search Box
const currentStatus = document.getElementById("currentStatus"); // Weather Condition Icon
const locationName = document.getElementById('location');
const currentDate = document.getElementById("date");
const temperature = document.getElementById('temp');
const condition = document.getElementById('condition');

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
    if (hours == 0) {
        hours = 12;
    }
    else if (hours >= 12) {
        period = "PM";
        if (hours > 12) {
            hours -= 12;
        }
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${month} ${date}, ${year} | ${hours}:${minutes} ${period}`;
}



// Fetch data from API
//Search Button Function
function searchLocation(event) {
    event.preventDefault();
    const city = event.target['name'].value;
    getData(city);
    status();
    textArea.value = "";
};

// Enter button function
textArea.addEventListener("keyup", function(event) {
    if(event.key === 13){
        event.preventDefault();
        searchLocation(event);
    }
});


const getData = async (cityName) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=286b38672a6e470917475581312f0907`;
    try {
        let data = await fetch(api);
        realData = await data.json();
        sendData(realData);
    } catch (error) {
        console.log(error);
    }
};

const sendData = (realData) => {
    let cityName = realData.name;
    let countryName = realData.sys.country;
    let temp = (realData.main.temp - 273).toFixed(2);
    let weatherCondition = realData.weather[0].description;

    locationName.innerText = `${cityName} | ${countryName}`;
    currentDate.innerHTML = `${getCurrentDay()} ${getCurrentTime()}`;
    temperature.innerText = `${temp}°C`;
    condition.innerText = `${weatherCondition}`;
    WeatherIcon();
};


// Change background based on time - Day / Night
if (currentTime.getHours() > 18 || currentTime.getHours() < 6) {
    boxBg.style.backgroundColor = "#191970";
}

// Change icon of current weather condition
const WeatherIcon = () => {
    let status = realData.weather[0].id;
    if (status>=200 && status<=232){
        currentStatus.setAttribute("src", '../icons/storm.png');
    }
    else if (status>=300 && status<=321){
        currentStatus.setAttribute("src", '../icons/drizzle.png');
    }
    else if (status>500 && status<=531){
        currentStatus.setAttribute("src", '../icons/rain.png');
    }
    else if (status>=600 && status<=622){
        currentStatus.setAttribute("src", '../icons/snow.png');
    }
    else if (status==701 || status==711){
        currentStatus.setAttribute("src", '../icons/mist.png');
    }
    else if (status>=721 && status<=771){
        currentStatus.setAttribute("src", '../icons/haze.png');
    }
    else if (status==781){
        currentStatus.setAttribute("src", '../icons/storm.png');
    }
    else if (status==800){
        currentStatus.setAttribute("src", '../icons/sun.png');
    }
    else if (status>=801 && status<=804){
        currentStatus.setAttribute("src", '../icons/cloudy.png');
    }
    else {
        currentStatus.setAttribute("src", '../icons/kweather.png');
    }
};