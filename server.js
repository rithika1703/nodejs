const http = require('http');

const server = http.createServer((req, res) => {
    // Extract the URL from the request
    const url = req.url;

    // Set the response headers
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Based on the URL, send custom responses
    if (url === '/home') {
        res.end('Welcome home');
    } else if (url === '/about') {
        res.end('Welcome to About Us page');
    } else if (url === '/node') {
        res.end('Welcome to my Node.js project');
    } else {
        // For any other URLs, send a generic response
        res.end('Invalid URL');
    }
});

// Start the server and make it listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
