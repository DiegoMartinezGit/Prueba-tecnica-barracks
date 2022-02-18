const express = require ("express");
const mariadb = require('mariadb');
const app=express();
const morgan=require("morgan");
//settings 
const pool = mariadb.createPool({
    host: "tests.cymdcl5gwbmr.us-east-1.rds.amazonaws.com", 
    user:'admin', 
    password: 'myPassword',
    connectionLimit: 5
});

app.set('port',3001)

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes 
app.get("/",(req,res)=>{
    res.send("helloworld")
});

//starting the server
app.listen(app.get("port"),()=>{
console.log("server on running on port " + app.get("port") );
});