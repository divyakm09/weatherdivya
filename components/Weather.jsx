//import React, {useEffect} from 'react'
import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import sun_icon from '../assets/cloud.png'
import cloud_icon from '../assets/clear.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
    const inputRef= useRef();
    const [weatherData, setWeatherData]= useState(false);
    const allIcons = {
        "01d":sun_icon,
        "01n":sun_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }

    const search = async(city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try{
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response=await fetch(url);
            const data=await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || sun_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon:icon
            })


        } catch (error) {
            error('Error fetching weather data. Please try again.'); 
            setWeatherData(null);

        }
    }
    useEffect(()=>{
        search("delhi");
    },[])

  return (
    <div className='weather'>
    <div className='search-bar'>
    <input  ref={inputRef} type="text" placeholder='Search'/>
    <img src={search_icon } alt="" className='search'onClick={()=>search(inputRef.current.value)} />
    </div>
    <br/>  
    <img src={weatherData.icon} alt="" className='sun'/>
    <p className='temp'>{weatherData.temperature}°c</p>
    <p className='location'>{weatherData.location}</p>
    <div className='weather-data'>
        <div className='col'>
            <img src={humidity_icon} alt="" className='humidity'/>
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className='col'>
            <img src={wind_icon} alt="" className='wind'/>
            <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
    </div>
    
      
    </div>
  )
}

export default Weather