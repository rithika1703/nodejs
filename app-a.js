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

app.post('/add-product', (req, res) => {
    const productName = req.body.productName;
    const productSize = req.body.productSize; // Retrieve product size from form data

    console.log('Product Name:', productName);
    console.log('Product Size:', productSize); // Log product size to console

    res.redirect('/'); // Redirect to home page or any other page
});
