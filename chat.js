const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(_ _ dirname +'/public'));

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