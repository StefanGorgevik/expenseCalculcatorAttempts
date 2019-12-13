const express =require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const url = '/app/v1/'


//making the connection with mongoose
const config = require('../config/index')
const DBConnection = require('../db/connection')
var c = config.getConfig("db")
DBConnection.initialize(c);

//handler
const productHandler = require('../handlers/products')

//routes and methods
app.get(url, productHandler.getAllProducts)
app.get(url + ':id', productHandler.getOne)
app.post(url, productHandler.saveProduct)
app.put(url + ':id', productHandler.replaceProduct);
app.patch(url + ':id', productHandler.updateProduct);
app.delete(url + ':id', productHandler.deleteProduct)

app.listen(8005, (err) => {
    if(err) {
        console.log(err)
        return
    }
    console.log("Server has started successfully on port 8005");
})