const city = document.querySelector('[data-city]')
const temperature = document.querySelector('[data-temperature')
const humidity = document.querySelector('[data-humidity')
const windspeed = document.querySelector('[data-wind-speed')
const description = document.querySelector('[data-description-text')
const icon = document.querySelector('[data-icon')
const searchButton = document.getElementById('search-button')
const searchBar = document.getElementById('search-bar')
const converter = document.querySelector('[data-converter]')
const card = document.querySelector('[data-card');

let currentCity = ''

let weather = {
    fetchWeather: async function(city){
        API_KEY: '022de2de5c864072882191158232508'
        try{
            const response = await fetch('http://api.weatherapi.com/v1/current.json?key=022de2de5c864072882191158232508&q=' + city + '&aqi=no')
            const data = await response.json();
            this.displayData(data)
        }catch(error){
            console.log(error)
        }
    },

    displayData: function(data){
        city.textContent = data.location.name + ', ' + data.location.country
        currentCity = data.location.name
        if(card.classList.contains('Fahrenheit')){
            temperature.textContent = data.current.temp_f + '°F'
        }else{
            temperature.textContent = data.current.temp_c + '°C'
        }
        humidity.textContent = 'Humidity: ' + data.current.humidity + '%'
        if(card.classList.contains('Fahrenheit')){
            windspeed.textContent = 'Wind Speed: ' + data.current.wind_mph + 'mph'
        }else{
            windspeed.textContent = 'Wind Speed: ' + data.current.wind_kph + 'km/h';
        }
        description.textContent = data.current.condition.text;
        icon.src = data.current.condition.icon
        icon.style.visibility = 'visible'
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + data.location.name + "')"
        console.log(data.current.condition.img);
    },

    search: function(){
        this.fetchWeather(searchBar.value)
    }
}

searchButton.addEventListener('click', function(){
    weather.search();
})

searchBar.addEventListener('keyup', function(event){
    if(event.key == "Enter"){
        weather.search()
    }
})

converter.addEventListener('click', e => {
    if(converter.innerText === "Fahrenheit"){
        converter.innerText = 'Celcius'
        card.classList.add('Fahrenheit')
    }else{
        converter.innerText = 'Fahrenheit'
        card.classList.remove('Fahrenheit')
    }

    weather.fetchWeather(currentCity)
})
weather.fetchWeather("new delhi")