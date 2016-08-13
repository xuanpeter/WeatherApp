"use strict";
//Here in the JSON.parse object, we are only parsing the JSON object. But in the weather
//data node/key and within the weather array, we have a js object, we have a property description
//We will create another variable called weatherData to be a new weather object. This uses the
//constructor we have in the weather-data.js--which is why the order is so important in the 
//Index.html file where we import the weather-data before app.js. 
//So we are creating a new weather object and pass the cityName (which is already abstracted)
//then we want to access the data we get back. Then we access the weather key in the JSON object
//which is an array and we access the description which is the first and only object in this case.
//then we are interested in the description (of the "data" that we are getting back) which we access 
//in the index [0] then we are interested in the description of that object and convert it all 
//toUpper case. 

//Now we need to set the temperature. We do this by accessing the temperature field, whichi is the
//field we added to the prototype. Then we set this to the data which is the temperature stored in "main"
//and then in the temp field --so data.main.temp

//Now in order to get it in C in order for the conversation to be right, we need to add something to the
//url after the cityName "&units=metric&appid=' + apiKey'

//then we sent our request with the http.send. Since we are not displaying anything yet on the page
//we will do a console.log(weatherData). 

searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if (cityName.trim().length == 0) {
        return alert('Please enter a City Name');
    }
    var http = new XMLHttpRequest();
    var apiKey = 'd95d2d6d769b58eee8f8a8f017e8f909';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!');
        }
    };
    http.send();
}

function updateWeather(weatherData) {
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;

    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}