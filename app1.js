const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Rithika!');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
