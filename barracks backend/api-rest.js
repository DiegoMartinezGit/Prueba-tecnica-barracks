const express = require ("express");
const res = require("express/lib/response");
const mariadb = require('mariadb');
const app = express();
const morgan=require("morgan");
const cors=require("cors");
const session = require('express-session')
var device = require('express-device');




//settings 
const pool = mariadb.createPool({
    host: "testing.cymdcl5gwbmr.us-east-1.rds.amazonaws.com", 
    user:'admin', 
    password: 'Ou*gNW#zvVrs%BsD1VDa',
    database:"Test"
});
const oneDay = 1000 * 60 * 60 * 24;
app.set('port',4000)


//middleware

app.use(session({
    secret: "thisismysecrctekey",
    saveUninitialized:false,
    cookie: {maxAge: oneDay * 7},
    resave: false

}));
 const corsOptions = {
   origin: true, //included origin as true
   credentials: true, //included credentials as true
};
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3004');

//   // Request methods you wish to allow
//   //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   //res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(device.capture());

//SQL Querys
const CREATE_TABLES="create table if not exists usuarios (id serial NOT NULL ,usertype varchar(10), email varchar(255) unique, password varchar(255), device varchar(20),session varchar(255),primary key(id));";
const USERS_RECORDS="insert into usuarios (usertype,email,password,device,session) values ('admin','admin@ejemplo.poc','admin123','DESKTOP',''),('suscriptor','suscriptor@ejemplo.poc','suscriptor123','DESKTOP','');";

//prepare tables and data 
console.log("conectando...")
  pool.getConnection()
    .then(conn => {
      conn.query("begin")
        .then((res) => {
          console.log("conected!!");
          return conn.query(CREATE_TABLES);
        }).then(()=>{
          console.log("procesando query 1")
          return conn.query(USERS_RECORDS);
        }).then(()=>{
          console.log("procesando query 2")
          return conn.query("commit");
        }).then((response) => {
          console.log(response,"\n Records Completed!"); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        
        .catch(err => {
          //handle error
          console.log(err);
          conn.query("rollback");
          return conn.end();
        })
        
    }).catch(err => {
      console.log("Not conected")
      res.statusCode=503;
      res.json({"error":"no se puede conectar a bd"})
      
    });

//routes 
app.put('/login',(req,res)=>{
    console.log("conectando...");
    pool.getConnection()
      .then(conn => {
        conn.query("select * from  usuarios where usuarios.email=? and usuarios.password=?;",[req.body.email,req.body.password])
          .then((rows) => {
            if (rows.length > 0) {
              delete rows[0]['password'];
              if(req.sessionID!==rows[0].session && rows[0].session !==''){
                req.sessionStore.destroy(rows[0].session);
                console.log("previus session destroyed")

              }
              conn.query("update usuarios set device= ? , session= ? where usuarios.id=?;",[req.device.type.toUpperCase(),req.sessionID,rows[0].id])
              .then(response=>{
                console.log("session and device updated")
                req.session.usuario=rows[0];
                res.statusCode=200;
                res.json({"ok":"Log in perfect","usuario": rows[0]});
                conn.end();
              })
            } else {
              console.log({"not ok ":"Incorrect Username and/or Password!"});
              res.statusCode=401;
              res.json({"not ok ":"Incorrect Username and/or Password!"});
              conn.end();
            }
          })
      }).catch(err => {
        console.log("Not conected")
        res.statusCode=503;
        res.json({"error":"no se puede conectar a bd"})
      });
});
app.delete('/logout',(req,res)=>{
  req.session.destroy();
  res.statusCode=200;
  res.json({})
});

app.get('/movies', function (req, res) {
  if (req.session.usuario){
    res.statusCode=200;
    res.json({"ok":"oki doki"});
  }
  else{
    res.statusCode=401;
    res.json({"no ok ":"not oki"});
  }
  
  
});
app.put('/registerUser',(req,res)=>{
  
  console.log("conectando...")
  pool.getConnection()
  .then(conn => {
    conn.query("insert into usuarios (usertype,email,password,device,session) values (?,?,?,?,?); ",[req.body.usertype,req.body.email,req.body.password,req.device.type.toUpperCase(),''])
      .then((db_res) => {
        console.log(db_res);
        res.statusCode=201;
        res.json({"ok ":"User register correctly!"});
        conn.end();

      }).catch(err => {
        console.log(err);
        res.statusCode=409;
        res.json({"usr":"usr ya registrado"})
        conn.end();
      });
  }).catch(err => {
    console.log("Not conected")
    console.log(err)
    res.statusCode=503;
    res.json({"error":"no se puede conectar a bd"})
  });
});

app.get('/getAllUsers',(req,res)=>{

  pool.getConnection().then(conn => {
      conn.query("select * from usuarios;").then((db_res) => {
          
          if(req.session.usuario.usertype=="admin"){
            db_res.map(row=>row.password=undefined);
            res.statusCode=200;
            res.json({"usuarios": db_res});
            conn.end();
          }else{
            res.statusCode=401;
            res.json("admin required")
            conn.end();
          } 

        }).catch(err => {
          console.log(err);
          res.statusCode=409;
          res.json({"not ok":"something happen"})
          conn.end();
        })
    }).catch(err => {
      console.log("Not conected")
      console.log(err)
      res.statusCode=503;
      res.json({"error":"db not connected"})
    });
});



//starting the server
app.listen(app.get("port"),()=>{
console.log("server on running on port " + app.get("port") );
});