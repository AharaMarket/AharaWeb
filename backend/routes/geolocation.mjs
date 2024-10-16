import express from "express";

const geolocationrouter = express.Router();

// Haversine formula implementation
function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
}

// POST endpoint to calculate distance
geolocationrouter.post('/distance', async (req, res) => {
    const { origin, destination } = req.body;

    // Validate input
    if (
        !origin ||
        !destination ||
        typeof origin.lat !== 'number' ||
        typeof origin.lng !== 'number' ||
        typeof destination.lat !== 'number' ||
        typeof destination.lng !== 'number'
    ) {
        return res.status(400).json({ error: 'Origin and destination latitude and longitude are required and must be numbers.' });
    }

    try {
        const distance = haversineDistance(
            origin.lat,
            origin.lng,
            destination.lat,
            destination.lng
        );

        // Convert distance to miles
        const distanceKilometers = distance / 1000;
        const distanceMiles = distanceKilometers * 0.621371;

        // Respond with distance in meters, kilometers, and miles
        res.json({
            distanceMeters: distance,
            distanceKilometers: distanceKilometers,
            distanceMiles: distanceMiles
        });
    } catch (error) {
        console.error('Error calculating distance:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

geolocationrouter.post('/filter-distance', async (req, res) => {
    const { origin, vendors, radius, unit } = req.body;

    // Validate input
    if (
        !origin ||
        !vendors ||
        !radius ||
        (unit !== 'km' && unit !== 'miles') ||
        typeof origin.lat !== 'number' ||
        typeof origin.lng !== 'number' ||
        !Array.isArray(vendors)
    ) {
        return res.status(400).json({ error: 'Invalid input. Please provide valid origin, vendors list, radius, and unit (km/miles).' });
    }

    try {
        // Convert radius to kilometers if it's provided in miles
        const radiusInKm = unit === 'miles' ? radius * 1.60934 : radius;

        // Filter vendors within the specified distance
        const vendorsWithinDistance = vendors.filter(vendor => {
            const distance = haversineDistance(
                origin.lat,
                origin.lng,
                vendor.lat,
                vendor.lng
            );
            return distance <= radiusInKm;
        });

        // Respond with the list of vendors within the distance
        res.json({ vendors: vendorsWithinDistance });
    } catch (error) {
        console.error('Error calculating distance for vendors:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

export default geolocationrouter;
