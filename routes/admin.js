
const path = require('path');

const express = require('express');
const Router = express.Router();



router.get('/add-product',(req, res,  next) => {
    res.send(path.join(__dirname,'../','views','add-product'));
});


router.post('/product',(req, res,  next) => {
    console.log(req.body);
    res.send('/');
});


module.exports = router;