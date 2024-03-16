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
        `
    })
})