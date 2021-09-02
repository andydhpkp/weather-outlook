var cityInputEl = document.querySelector('#citySearch');


function citySearchFunction(city) {
    //format the api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=52a157ee5c11148c94d26b144b7f8358'
    fetch(apiUrl).then(function(response) {
        //request was successful
        if(response.ok) {
            response.json().then(function(data) {
                displayWeather(data, city);
            });
        } else {
            alert("Error: City Not Found");
        }
    }).catch(function(error) {
        alert("Unable to connect to OpenWeather")
    })
}

function formSubmitHandler(event) {
    event.preventDefault();
    //get value from input
    var cityName = cityInputEl.value.trim();

    if(cityName) {
        citySearchFunction(cityName);
    } else {
        alert("Please enter a valid city")
    }
}

function displayWeather(weatherData, city) {

    //display main city
    var mainCityEl = document.getElementById('cityName')
    mainCityEl.innerHTML = city + ' '

    //display date
    var mainDate = moment().format('MM/DD/YYYY')
    var mainDateEl = document.getElementById('date')
    mainDateEl.innerHTML = mainDate + ' '

    //display main icon
    var mainIcon = weatherData.weather.icon;
    var mainIconEl = document.getElementById('dateIcon');
    mainIconEl.innerHTML = mainIcon

    //display main temp
    var mainTemp = weatherData.main.temp;
    var mainTempEl = document.getElementById('temperature');
    mainTempEl.innerHTML = mainTemp + '&#8457;'

    //display main humidity
    var mainHumidity = weatherData.main.humidity;
    var mainHumidityEl = document.getElementById('humidity');
    mainHumidityEl.innerHTML = mainHumidity + '%'

    //display main wind speed
    var mainWindSpeed = weatherData.wind.speed;
    var mainWindSpeedEl = document.getElementById('windSpeed');
    mainWindSpeedEl.innerHTML = mainWindSpeed + ' MPH'

    //get UVIndex
    getUVIndex(weatherData.coord.lat, weatherData.coord.lon)

    console.log(weatherData)
    console.log(city)
}

function getUVIndex(lat, lon) {
        //format the api url
        var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily,alerts&appid=52a157ee5c11148c94d26b144b7f8358'
        fetch(apiUrl).then(function(response) {
            //request was successful
            if(response.ok) {
                response.json().then(function(data) {
                    var UVIndex = data.current.uvi;
                    var UVIndexEl = document.getElementById('uvIndex')
                    UVIndexEl.innerHTML = UVIndex
                    if (UVIndex <= 2) {
                        alert('green')
                    } if (UVIndex > 2 && UVIndex < 6) {
                        alert('yellow')
                    } if (UVIndex >= 6) {
                        alert('red')
                    }
                });
            } else {
                alert("Error: UVI Not Found");
            }
        }).catch(function(error) {
            alert("Unable to connect to OpenWeather")
        })
}
