const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    res.writeHead(2--,{'Conten-Type : 'text/plain});
    res.end('Hello, Rithika!');
})
    console.log('rithika');
});

server.listen(4000);