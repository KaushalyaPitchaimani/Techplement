let loc=document.getElementById('location');
let tempIcon =document.getElementById('temp-icon');
let tempValue= document.getElementById('temp-value');
let climate= document.getElementById('climate');
let iconFile;
let searchButton = document.getElementById('search-button');
let searchInput = document.getElementById('search-input');


window.addEventListener('load',()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long= position.coords.longitude;
            lat= position.coords.latitude;
            // const proxy="https://api.allorigins.win/get?url=";
            const api= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b498e2eebe99a83666aa78b8147d0ad3`;

            // https://api.openweathermap.org/data/2.5/weather?q=Borivali&appid=b498e2eebe99a83666aa78b8147d0ad3

            fetch(api).then((response)=>{
                return response.json();
            }) 
            .then(data=>{
                const {name}= data;
                const {feels_like}= data.main;
                const {id,main}=data.weather[0];
                loc.textContent=name;
                climate.textContent=main;
                tempValue.textContent=Math.round(feels_like-273);

                
               
                searchButton.addEventListener('click', () => {
                    const locationName = searchInput.value;
                    if (locationName) {
                        fetchWeatherByLocationName(locationName);
                    } else {
                        alert('Please enter a location');
                    }
                });
                
                function fetchWeatherByLocationName(locationName) {
                    const api = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=b498e2eebe99a83666aa78b8147d0ad3`;
                
                    fetch(api)
                        .then(response => response.json())
                        .then(data => {
                            const { name } = data;
                            const { feels_like } = data.main;
                            const { main } = data.weather[0];
                            loc.textContent = name;
                            climate.textContent = main;
                            tempValue.textContent = Math.round(feels_like - 273);
                        })
                        .catch(error => {
                            console.error('Error fetching weather data:', error);
                        });
                }

                console.log(data);
            })
        })
    }
})
