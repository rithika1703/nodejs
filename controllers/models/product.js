const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename), 
    'data',
    'products.json'
     );

const getProductsfromFIle = cb => {
    
    fs.readFile(p, (err,fileContent)=>{
        if(err){
            return cb([]);
        }else {
        cb(JSON.parse(fileContent));
    }
});
};

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsfromFIle(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            }); 
        });
         fs.readFile(p, (err, fileContent) => {});
        }

    static fetchAll(cb) {
        getProductsfromFIle(cb);
        
    }
};