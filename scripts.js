const date = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const tempImg = document.getElementById('tempImg');
const description = document.getElementById('description');
const maxTemp = document.getElementById('maxTemp');
const minTemp = document.getElementById('minTemp');

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

let dateObj = new Date();
let month = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();

date.innerHTML = `${month} ${day}, ${year}`;

const app = document.getElementById('app');

const getWeather = async () => {
    try {
        const searchBarInput = document.getElementById('searchBarInputField');
        if (!searchBarInput) {
            console.error("Search bar input field not found!");
            return;
        }
        
        const cityName = searchBarInput.value.trim();    
        const weatherDataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ac3d388fcc0be70f948f1a59a2ed5e88`, {
            headers: {
                Accept: "application/json"
            }
        });  

        const weatherData = await weatherDataFetch.json();    
        console.log(weatherData);

        city.innerHTML = `${weatherData.name}`;
        description.innerHTML = `${weatherData.weather[0].main}`;
        tempImg.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        temp.innerHTML = `<h2>${Math.round(weatherData.main.temp - 273.15)}°C</h2>`;    
        maxTemp.innerHTML = `${Math.round(weatherData.main.temp_max - 273.15)}°C`;
        minTemp.innerHTML = `${Math.round(weatherData.main.temp_min - 273.15)}°C`;
    } catch (error) {
        console.log("Error fetching weather data:", error);
    }
}

// getWeather();
