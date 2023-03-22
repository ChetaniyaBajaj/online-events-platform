const connectMongo = require("./db");
const express = require("express")
const fileupload = require('express-fileupload')
const cors=require("cors");
// const path = require("path");
// const bodyParser = require('body-parser');
require('dotenv').config();

connectMongo();
const app = express();
const port = 5000;

var session = require('express-session')
app.use(session({
    secret:'login',
    cookie:{maxAge:6000},
    saveUninitialized:false,
    resave:false
})); 
app.use(require('flash')());

// const { verify } = require('crypto');
// const { nextTick } = require('process');
// const { Console } = require('console');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json())  // To allow json in request's body
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./routes/req"));
app.use(fileupload());
app.listen(port, ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
})
