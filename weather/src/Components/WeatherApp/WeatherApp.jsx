import React from 'react';
import { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import './WeatherApp.css';

import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const weatherAPI = '',
	googleAPI = '';

const WeatherApp = () => {
	const [humidity, setHumidity] = useState(0),
		[wind, setWind] = useState(0),
		[location, setLocation] = useState('N/A'),
		[weatherImage, setWeatherImage] = useState(clear_icon),
		[temperature, setTemperature] = useState(0);

	const search = async (place) => {
		if (!place) return;
		let getCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${place.address_components[0].long_name}&units=Imperial&appid=${weatherAPI}`;

		let response = await fetch(getCurrent);
		response.json().then(data => {
			setLocation(data.name);
			setTemperature(Math.ceil(data.main.temp));
			setHumidity(data.main.humidity);
			setWind(data.wind.speed);
			setWeatherImage(() => {
				switch (data.weather[0].main) {
					case 'Clouds':
						return cloud_icon;
						break;
					case 'Rain':
						return rain_icon;
						break;
					case 'Snow':
						return snow_icon;
						break;
					case 'Clear':
						return clear_icon;
						break;
				}
			});
		});
	}
	return (
		<div className='container'>
			<Autocomplete className='location-search' apiKey={ googleAPI } onPlaceSelected={ (place) => search(place) } />
			<div className='weather-image'>
				<img src={ weatherImage } />
			</div>
			<div className='weather-temperature'>{ temperature } &#xb0;F</div>
			<div className='weather-location'>{ location }</div>
			<div className='data-container'>
				<div className='humidity-data'>
					<img src={ humidity_icon } className='humidity-icon' />
					<div className='data'>
						<div className='humidity-percent'>{ humidity } %</div>
						<div>Humidity</div>
					</div>
				</div>
				<div className='wind-data'>
					<img src={ wind_icon } className='wind-icon' />
					<div className='data'>
						<div className='wind-speed'>{ wind } km/h</div>
						<div>Wind Speed</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WeatherApp;