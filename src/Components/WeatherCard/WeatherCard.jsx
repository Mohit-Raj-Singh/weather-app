import React from 'react'
import kelvinToCelsius, { addCommas, convertWindDirectionAndSpeed, customRound, mpsToKmph } from '../../lib/helperFunction'

const WeatherCard = ({ weatherData }) => {
    return (
        <div className='w-[85%] lg:w-[100%] m-auto p-6 lg:p-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12'>
                {/* wind card */}
                <div className='bg-[#3e5569] text-white rounded-2xl p-4'>
                    <h3 className='text-xl'>Wind</h3>
                    <img src='./assets/icons/wind.svg' alt='wind-icon' className='w-28 m-auto mt-2 lg:mt-4' />
                    <h2 className='text-lg lg:text-2xl mt-2 lg:mt-6'>{customRound(mpsToKmph(weatherData?.wind?.speed))} km/h</h2>
                    <h3 className='text-xl'>{convertWindDirectionAndSpeed(weatherData?.wind?.deg, weatherData?.wind?.speed)}</h3>
                </div>
                {/* Humidity card */}
                <div className='bg-[#3e5569] text-white rounded-2xl p-4'>
                    <h3 className='text-xl'>Humidity</h3>
                    <img src='./assets/icons/humidity.png' alt='humidity-icon' className='w-28 m-auto mt-4' />
                    <h2 className='text-2xl mt-6'>{weatherData?.main?.humidity}%</h2>
                    <h3 className='text-xl'>Dew point {customRound(kelvinToCelsius(weatherData?.main?.temp_min)) - 15}°</h3>
                </div>
                {/* UV-Index Card */}
                <div className='bg-[#3e5569] text-white rounded-2xl p-4'>
                    <h3 className='text-xl'>Visibility</h3>
                    <img src='./assets/icons/fogg.svg' alt='ui index-icon' className='w-28 m-auto mt-4' />
                    <h2 className='text-2xl mt-6'>{addCommas(weatherData?.visibility)}</h2>
                    <h3 className='text-xl'>From 10 KM</h3>
                </div>
                {/* Pressure Card */}
                <div className='bg-[#3e5569] text-white rounded-2xl p-4'>
                    <h3 className='text-xl'>Pressure</h3>
                    <img src='./assets/icons/pressure.svg' alt='pressure-icon' className='w-28 m-auto mt-4' />
                    <h2 className='text-2xl mt-6'>{addCommas(weatherData?.main?.pressure)}</h2>
                    <h3 className='text-xl'>hPa</h3>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard
