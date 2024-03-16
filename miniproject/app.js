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