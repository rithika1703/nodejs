const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>'); // Fixed typo: '</head>'
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>'); // Fixed syntax errors
        res.write('</html>'); // Fixed typo: '<html'
        return res.end(); // Fixed typo: '.'
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]; // Fixed typo: parseBody -> parsedBody
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>'); // Added opening HTML tag
    res.write('<head><title>My first Page</title></head>'); // Fixed typo: ','
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>'); // Fixed typo: ','
    res.write('</html>'); // Fixed typo: ','
    res.end();
};

module.exports = requestHandler; // Fixed typo: module.exportss -> module.exports
  
