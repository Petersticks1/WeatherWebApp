const apiKey = "03e0100c6edbe4050fa08ae67892b63d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const weatherCondition = data.weather[0].main;

        if (weatherCondition === "Clouds") {
            weatherIcon.src = "images/cloud.256x180.png";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "images/weather-clear-symbolic.256x256.png";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "images/sun-behind-rain-cloud.226x256.png";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherCondition === "Snow") {
            weatherIcon.src = "images/snow (1).png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Background Gradient Change
const body = document.body;

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeGradient() {
    const color1 = generateRandomColor();
    const color2 = generateRandomColor();
    body.style.background = `linear-gradient(120deg, ${color1}, ${color2})`;
    body.style.backgroundSize = "400% 400%";
}

setInterval(changeGradient, 5000); // Change every 5 seconds

// Adding smooth transition to gradient
body.style.transition = "background 2s ease";
