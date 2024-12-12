var API_KEY = "08eb77e25193486ba2f133025240812";

async function showSuggestions() {
  var input = document.getElementById("cityInput").value;
  var suggestionsBox = document.getElementById("suggestions");

  if (input.length < 3) {
    suggestionsBox.classList.add("d-none");
    return;
  }

  try {
    var response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input}`
    );
    var suggestions = await response.json();
    suggestionsBox.innerHTML = "";
    suggestions.forEach((city) => {
      var suggestion = document.createElement("div");
      suggestion.className = "autocomplete-suggestion";
      suggestion.textContent = `${city.name}, ${city.country}`;
      suggestion.onclick = () => {
        document.getElementById("cityInput").value = city.name;
        suggestionsBox.classList.add("d-none");
      };
      suggestionsBox.appendChild(suggestion);
    });

    suggestionsBox.classList.remove("d-none");
  } catch (error) {
    console.error("Error :", error);
  }
}

async function fetchWeather() {
  var city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    var response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
    );
    var data = await response.json();

    document.getElementById("weatherDisplay").classList.remove("d-none");
    document.getElementById(
      "cityName"
    ).textContent = `${data.location.name}, ${data.location.country}`;

    var forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = "";

    data.forecast.forecastday.forEach((day) => {
      var forecastDate = new Date(day.date).toDateString();
      var maxTemp = day.day.maxtemp_c;
      var minTemp = day.day.mintemp_c;
      var condition = day.day.condition.text;
      var icon = day.day.condition.icon;

      forecastContainer.innerHTML += `
                        <div class="col-md-3 forecast-card mx-3">
                            <h5>${forecastDate}</h5>
                            <img src="${icon}" alt="${condition}" class="mb-2">
                            <p><strong>${condition}</strong></p>
                            <p>Max: ${maxTemp}&deg;C</p>
                            <p>Min: ${minTemp}&deg;C</p>
                        </div>
                    `;
    });
  } catch (error) {
    console.error(error);
    alert("Please try again.");
  }
}
