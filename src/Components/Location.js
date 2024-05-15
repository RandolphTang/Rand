import axios from 'axios'

export async function getCoordinatesForCity(city: string): Promise<{ latitude: number; longitude: number } | null> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    try {
        const response = await axios.get(url);
        const results = response.data.results;

        if (results.length > 0) {
            const { latitude, longitude } = results[0];
            return { latitude, longitude };
        }
        return null;
    } catch (error) {
        console.error("Failed to get coordinates:", error);
        return null;
    }
}



