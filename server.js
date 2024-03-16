const http = require('http');

const server = http.createServer((req, res) =>{
    console.log(req.url, req.method,req.headers);
    res.setHeader('Content-Type', 'text/html');
    if(url === '/home'){
        res.end('welcome home');
    }else if(url ==='about'){
        res.end('welcome to About Us page')
    }else if(url === 'node'){
        res.end('welcom to my Node.js project');
    }
});

server.listen(4000,() =>{
    console.log('server is running on port 4000');
})

