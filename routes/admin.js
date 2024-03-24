const express = require('express');
const Router = express.Router();



router.get('/add-product',(req, res,  next) => {
    res.send('<form action="/product" method="POST"><input type="text"name="title"><button type="submit">');
});



router.post('/product',(req, res,  next) => {
    console.log(req.body);
    res.send('/');
});


module.exports = router;