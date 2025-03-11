const dateEl = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const tempImg = document.getElementById('tempImg');
const description = document.getElementById('description');
const maxTemp = document.getElementById('maxTemp');
const minTemp = document.getElementById('minTemp');
const searchBarInput = document.getElementById('searchBarInputField');

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

function updateDateTime() {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    let time = dateObj.toLocaleTimeString();

    dateEl.innerHTML = `${month} ${day}, ${year} - ${time}`;
}

// Run initially and update every second
updateDateTime();
setInterval(updateDateTime, 1000);

const getWeather = async () => {
    try {
        if (!searchBarInput) {
            console.error("Search bar input field not found!");
            return;
        }

        const cityName = searchBarInput.value.trim();
        if (!cityName) {
            alert("Please enter a city name.");
            return;
        }

        const apiKey = "ac3d388fcc0be70f948f1a59a2ed5e88"; // Store safely in environment variable
        const weatherDataFetch = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        const weatherData = await weatherDataFetch.json();

        if (weatherData.cod !== 200) {
            alert(`Error: ${weatherData.message}`);
            return;
        }

        console.log(weatherData);

        city.innerHTML = `${weatherData.name}`;
        description.innerHTML = `${weatherData.weather[0].main}`;
        tempImg.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
        temp.innerHTML = `<h2>${Math.round(weatherData.main.temp)}°C</h2>`;
        maxTemp.innerHTML = `${Math.round(weatherData.main.temp_max)}°C`;
        minTemp.innerHTML = `${Math.round(weatherData.main.temp_min)}°C`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
};

// Run getWeather when the user presses "Enter"
searchBarInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});
