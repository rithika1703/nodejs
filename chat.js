const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Routes
// Login route to show the form
app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="post">
            <input type="text" name="username" placeholder="Enter your username">
            <button type="submit">Login</button>
        </form>
    `);
});

// Handling login form submission
app.post('/login', (req, res) => {
    const username = req.body.username;
    req.session.username = username; // Storing username in session
    res.redirect('/');
});

// Show send message form
app.get('/', (req, res) => {
    const username = req.session.username;
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

// Handling send message form submission
app.post('/send-message', (req, res) => {
    const username = req.session.username;
    if (!username) {
        res.redirect('/login');
        return;
    }
    const message = req.body.message;
    // Store message in file
    fs.appendFile('messages.txt', `${username}: ${message}\n`, (err) => {
        if (err) {
            res.send('Error storing message.');
            return;
        }
        res.send('Message sent successfully!');
    });
});

// Reading and displaying messages from file
app.get('/messages', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) {
            res.send('Error reading messages.');
            return;
        }
        // Splitting data into lines and displaying
        const messages = data.split('\n');
        let formattedMessages = '';
        messages.forEach(msg => {
            if (msg.trim() !== '') {
                formattedMessages += `${msg}<br>`;
            }
        });
        res.send(formattedMessages);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
