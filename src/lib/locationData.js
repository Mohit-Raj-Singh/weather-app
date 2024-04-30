// useLocationData.js

import { useEffect, useState } from 'react'

export const useLocationData = () => {
    const [locationData, setLocationData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords
                        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                        const data = await response.json()
                        const city = data.locality
                        const state = data.principalSubdivision
                        setLocationData({ latitude, longitude, city, state })
                        setLoading(false)
                    },
                    (error) => {
                        console.error("Error getting user's location:", error)
                        setLoading(false)
                    },
                )
            } else {
                console.error('Geolocation is not supported by this browser.')
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { locationData, loading }
}

export function promptPermission() {
    if ('permissions' in navigator) {
        navigator.permissions
            .query({ name: 'notifications' })
            .then((permissionStatus) => {
                if (permissionStatus.state === 'prompt') {
                    return Notification.requestPermission()
                }
            })
            .then((permissionResult) => {
                if (permissionResult !== 'granted') {
                    // Permission not granted, handle accordingly (e.g., show alert)
                    alert('Permission denied for notifications.')
                }
            })
            .catch((error) => {
                console.error('Error querying permission:', error)
            })
    } else if ('Notification' in window) {
        Notification.requestPermission((permission) => {
            if (permission !== 'granted') {
                // Permission not granted, handle accordingly (e.g., show alert)
                alert('Permission denied for notifications.')
            }
        })
    } else {
        // Browser does not support notifications
        alert('Browser does not support notifications.')
    }
}
