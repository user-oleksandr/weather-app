function WeatherPopup(data, city) {
    const cityName = city.charAt(0).toUpperCase() + city.slice(1); // the first character of the city name is upper case
    const {main, icon} = data.weather[0];
    const {temp, pressure} = data.main;
    const {sunrise, sunset} = data.sys;
    const {speed: windSpeed, deg: windDirection} = data.wind;
    const roundedTemp = Math.round(temp);
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`; // URL of the weather icon
    // create weather forecast popup
    const popupContent = `
    <div class="content-weather-map">    
      ${cityName}
      <br>      
      <img src="${iconUrl}" alt="${main}">   
      <br>          
      Wind: ${windDirection}&deg ${Math.round(windSpeed)}m/s
      <br>   
      Temperature: ${roundedTemp}&deg;C
      <br>       
      Pressure: ${Math.round(pressure * 0.750062)} mmHg 
      <br>                                                               
      Sunrise: ${new Date(sunrise * 1000).toLocaleTimeString()}
      <br>          
      Sunset: ${new Date(sunset * 1000).toLocaleTimeString()}
    </div>`;
    return popupContent;
}

export default WeatherPopup;
