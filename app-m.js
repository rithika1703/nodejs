
const http = require('http');

const express = require('express');

const app = express();

app.use('/',(req,res,next) => {
    console.log('This always runs');
});

app.use('/add-product',(req, res,  next) => {
    console.log('In another Middleware!');
    res.send('<h1>the add product page!</h1>');
});



app.use('/',(req, res,  next) => {
    console.log('In another Middleware!');
    res.send('<h1>hello from Express!</h1>');
});

const server = http.createServer(app);

server.listen(3000);

