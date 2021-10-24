document.addEventListener("DOMContentLoaded", () => {
  const dataContainer = document.getElementById("data-container");
  const weatherForm = document.getElementById("weather-form");
  const cityInput = document.getElementById("city");
  const clearButton = document.getElementById('clear')

  const fetchWeatherData = async (city) => {
    const url = `/api?q=${city}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
      alert(`${city} Is Not Found`);
    }

    const displayData = {
      city: data.name,
      temp: kelvinToFahrenheit(data.main.temp),
    };

    addWeatherToDOM(displayData);
  };

  // Display Data to DOM
  const addWeatherToDOM = (data) => {
    dataContainer.innerHTML = `
            <h1>Weather in ${data.city}</h1>
            <h2>${data.temp} &deg;F</h2>
        `;
  };

  // convert kelvin to Fahrenheit
  const kelvinToFahrenheit = (temp) => {
    return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
  };

  // Event listener for form submission
  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cityInput.value === "") {
      alert("please Enter a City");
    } else {
      fetchWeatherData(cityInput.value);
    }
  });

  // clear city Input

  clearButton.addEventListener("click", ()=>{
    cityInput.value = "";    
  })

  // Initial fetch
  fetchWeatherData("Cairo");
});
