import sendRequest, { sendPublicRequest } from './sendRequest'

//Get details from verifier table
export const fetchCitiesData = async (data) => {
    try {
        const response = await sendRequest(`/countries/cities`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        return response
    } catch (err) {
        console.error(err)
    }
}

export const fetchWeatherDetails = async (city) => {
    try {
        const response = await sendPublicRequest(`/weather/${city}`, {
            method: 'GET',
        })
        return response
    } catch (err) {
        console.error(err)
    }
}

export const fetchWeatherWithLocation = async (data) => {
    try {
        const response = await sendPublicRequest(`/current-weather`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        return response
    } catch (err) {
        console.error(err)
    }
}
