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
       console.log(realData);
    } catch (error) {
        
    }
};

getData();