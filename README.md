# Secure Installations Map

This project displays installation locations on a Google Map using data from Airtable. The sensitive API keys are now secured using Vercel serverless functions.

## Security Improvements

✅ **Before**: API keys were exposed in client-side code  
✅ **After**: API keys are stored as environment variables and accessed via secure serverless functions

## Project Structure

- `map.html` - The main HTML file with the map interface
- `api/airtable-data.js` - Serverless function to fetch Airtable data securely
- `api/maps-config.js` - Serverless function to provide Google Maps API key securely
- `package.json` - Project dependencies and scripts
- `vercel.json` - Vercel deployment configuration

## Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm install -g vercel
```

### 2. Set up Environment Variables

In your Vercel project dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add these variables for **Production**, **Preview**, and **Development**:

```
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=your_table_name
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 3. Deploy to Vercel
```bash
vercel --prod
```

### 4. Local Development

1. Create a `.env.local` file in the project root:
```
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=your_table_name
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

2. Run the development server:
```bash
vercel dev
```

## How It Works

1. The HTML file loads and calls `/api/maps-config` to get the Google Maps API key
2. Google Maps API is loaded dynamically with the secure API key
3. The map initializes and calls `/api/airtable-data` to fetch location data
4. Markers are placed on the map with the fetched data

## Security Features

- **Environment Variables**: All sensitive keys are stored as environment variables
- **Serverless Functions**: API calls are made server-side, hiding credentials
- **Error Handling**: Proper error handling for API failures
- **Method Restrictions**: API endpoints only accept GET requests
- **Data Sanitization**: Only necessary data is returned to the client

## API Endpoints

- `GET /api/airtable-data` - Returns location data from Airtable
- `GET /api/maps-config` - Returns Google Maps API configuration

Both endpoints return JSON responses and include proper error handling. 