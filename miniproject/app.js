const http = require('http');
const fs = require('fs');
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
function updateMessages(newMessage, callback) {
    fs.appendFile('messages.txt', newMessage + '\n', 'utf8', (err) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null);
    });
}
const server =  http.createServer((req, res) =>{
    readMessages((err,message) =>{
        if(err){
            res.writeHead(500,{'Content-Type' : 'text/plain'});
            res.end('Internal Server Error');
            return ;
        }
        let htmlContent =`
        <html>
        <head><title> Messages </title></head>
        <body> <h1> Messages </h1></body>
        <ul>
        `;
        htmlContent +=`
        ,<ul>
        <form method ="post" action="/">
        <input type ="text" name="newMessage" Placeholder="Enter new message">
        <button type= "submit"> Add Message</button>
        </form>
        </body>
        </html>`;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(htmlContent);
    });

});

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



server.listen(3000,() =>{
    console.log('Server is running on port 3000');
});