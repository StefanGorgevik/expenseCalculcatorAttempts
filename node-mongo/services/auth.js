const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//making the connection with mongoose
const config = require('../config/index')
const DBConnection = require('../db/connection')
var c = config.getConfig("db")
DBConnection.initialize(c);

app.use(bodyParser.json());

//routes
const authHandler = require('../handlers/authHandler')
const url = '/app/v1'
app.post('/app/v1/register', authHandler.register)
app.get(url, (req,res)=> {
    res.send("OK")
})
app.post(url + '/login', authHandler.login)

app.listen(8006, (err) => {
    if(err) {
        console.log(err);
        return
    }
    console.log("Auth Server has started successfully on port 8006")
})