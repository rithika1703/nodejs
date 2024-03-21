const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add-product', (req, res) => {
    res.send(`
        <form action="/add-product" method="POST">
            <input type="text" name="productName" placeholder="Product Name">
            <input type="text" name="productSize" placeholder="Product Size"> <!-- New input for product size -->
            <button type="submit">Add Product</button>
        </form>
    `);
});

