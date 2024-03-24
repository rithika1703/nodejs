
const http = require('http');

const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin.js')

const shopRoutes = require('././routes/shop');

app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRoutes);

server.listen(3000);

