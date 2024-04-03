const express = require('express');
const { google } = require('googleapis');
const key = require('/Users/y0311/OneDrive/Desktop/Codes/Projects/Projects/TouchGrass/touchgrass/key.json'); 



const app = express();


const GA4_PROPERTY_ID = '434744364'; 

const runReport = async () => {
    try {
        // Create a new JWT client using your service account key
        const auth = new google.auth.GoogleAuth({
            credentials: key,
            scopes: ['https://www.googleapis.com/auth/analytics.readonly']
        });

        // Obtain an authenticated client
        const client = await auth.getClient();

        // Create a new Analytics Data API instance
        const analyticsData = google.analyticsdata({ version: 'v1beta', auth: client });

        // Make a request to the Analytics Data API to run a report
        const response = await analyticsData.properties.runReport({
            property: `properties/${GA4_PROPERTY_ID}`,
            requestBody: {
                dateRanges: [{ startDate: '2024-01-01', endDate: '2024-04-02' }],
                dimensions: [{ name: 'country' }],
                metrics: [{ name: 'activeUsers' }]
            }
        });

        console.log('API Response:', response);

        return response.data;
    } catch (error) {
        console.error('Error fetching report data:', error);
        throw error;
    }
};

app.get('/api/total-visitors', async (req, res) => {
    try {


        // Call runReport to fetch visitor data
        const visitorData = await runReport();

        // Set the Content-Type header to indicate JSON response
        res.setHeader('Content-Type', 'application/json');
    
        // Convert the visitorData to JSON format before sending
        const jsonData = JSON.stringify(visitorData);
    
        // Send the JSON response to the client
        res.send(jsonData);
    } catch (error) {
        console.error('Error fetching visitor data:', error);
        res.status(500).json({ error: 'Internal server error' }); // Return a JSON-formatted error response
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { runReport };