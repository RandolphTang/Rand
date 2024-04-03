const express = require('express');
const { runReport } = require('./userCounterServer');

// Check if the script is executed directly or required as a module
if (require.main === module) {
    // If executed directly, start the server
    const app = express();
    const port = 3001; // Change the port number if needed

    // Define your routes and middleware here

    // Start the server
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    // Handle proper termination
    process.on('SIGINT', () => {
        console.log('Shutting down server...');
        server.close(() => {
            console.log('Server has been gracefully terminated');
            process.exit(0);
        });
    });
}

async function testRunReport() {
    try {
        const data = await runReport();
        console.log('Report data:', data);
    } catch (error) {
        console.error('Error fetching report data:', error);
    }
}

testRunReport();
