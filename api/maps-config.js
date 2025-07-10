export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
      return res.status(500).json({ error: 'Google Maps API key not configured' });
    }

    res.status(200).json({ apiKey: googleMapsApiKey });
  } catch (error) {
    console.error('Error getting Google Maps config:', error);
    res.status(500).json({ error: 'Failed to get configuration' });
  }
} 