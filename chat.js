const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret :'your-secret-key',
    resave: false,
    saveUninitialized : true
}));

app.get('/login',(req,res) => {
    res.send(`<form action = "/login" method="post"
    <input type="text" name="username" placeholder="enter your name">
        <button type = "submit">login</button>
        </form>`);
});

app.post('/login',(req,res) => {
    const username = req.body.username;
    res.send(`<script>localStorage.setItem('username','${username}')window.location.href="/";</script>`);
});

app.get('/', (req, res) => {
    const username = localStorage.getItem('username');
    if (!username) {
        res.redirect('/login');
        return;
    }
    res.send(`
        <form action="/send-message" method="post">
            <input type="text" name="message" placeholder="Enter your message">
            <button type="submit">Send Message</button>
        </form>
    `);
});

app.post('/send-message',(req,res) => {
    const username = localStorage.getItem('username');
    if(!username) {
        res.redirect('/login');
        return;
    }
    const message = req.body.message;
    fs.appendFileSync('message.txt',`${username}: ${message}\n`);
    res.send('Message sent successfully!');
});

app.get('/message',(req,res) => {
    fs.readFile('message.txt','utf8',(err,data) => {
        if(err) {
            res.send('Error reading messages.');
            return;
        }
        const message = data.split('/n');
        let formattedMessages = '';
        message.forEach(msg =>{
            if (msg.trim() !== ''){
                formattedMessages += `${msg},<br>`;
            }
        });
        res.send(formattedMessages);
    });
});

app.listen(port,() => {
    console.log(`server is running on http://localhost:3000`);

});