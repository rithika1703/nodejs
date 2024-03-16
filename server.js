const http = require('http');
const fs = require('fs');

// Function to read messages from the file
function readMessages(callback) {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        const messages = data.split('\n').filter(message => message.trim() !== '');
        callback(null, messages);
    });
}

// Function to update messages in the file
function updateMessages(newMessage, callback) {
    fs.appendFile('messages.txt', newMessage + '\n', 'utf8', (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Read messages from the file
    readMessages((err, messages) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        // HTML form to display messages and input field to add new message
        let htmlContent = `
            <html>
            <head>
                <title>Messages</title>
            </head>
            <body>
                <h1>Messages</h1>
                <ul>
        `;
        // Display messages at the top of the form
        messages.forEach(message => {
            htmlContent += `<li>${message}</li>`;
        });

        // HTML form to add new message
        htmlContent += `
                </ul>
                <form method="post" action="/">
                    <input type="text" name="newMessage" placeholder="Enter new message">
                    <button type="submit">Add Message</button>
                </form>
            </body>
            </html>
        `;

        // Send HTML response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    });
});

// Handle POST requests to add new message
server.on('request', (req, res) => {
    if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newMessage = decodeURIComponent(body.split('=')[1]);
            updateMessages(newMessage, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(302, { 'Location': '/' });
                res.end();
            });
        });
    }
});

// Start the server and make it listen on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
