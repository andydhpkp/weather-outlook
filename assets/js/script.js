function citySearchFunction() {
    var city = document.getElementById('citySearch').value.trim()
    fetch('api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=52a157ee5c11148c94d26b144b7f8358')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
}

citySearchFunction();