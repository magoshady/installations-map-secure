export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get credentials from environment variables
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableName = process.env.AIRTABLE_TABLE_NAME;

    if (!airtableApiKey || !airtableBaseId || !airtableTableName) {
      return res.status(500).json({ error: 'Missing required environment variables' });
    }

    // Fetch data from Airtable
    const response = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}?view=Grid%20view`, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Return only the necessary data (remove sensitive info)
    const sanitizedRecords = data.records.map(record => ({
      id: record.id,
      fields: {
        'Site Latitude': record.fields['Site Latitude'],
        'Site Longitude': record.fields['Site Longitude'],
        'Site Address': record.fields['Site Address'],
        'Site Suburb': record.fields['Site Suburb'],
        'Site Post Code': record.fields['Site Post Code']
      }
    }));

    res.status(200).json({ records: sanitizedRecords });
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
} 