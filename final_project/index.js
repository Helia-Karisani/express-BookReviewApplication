const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express(); // initialized express app

app.use(express.json()); // Enables the app to parse incoming JSON payloads in request bodies.
// Session Middleware for /customer Routes, Session will track users between requests
app.use("/customer",session({
    secret:"fingerprint_customer",
    resave: true, 
    saveUninitialized: true
}))
// Authentication Middleware for /customer/auth/* Routes. Applies authentication check
app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
});
 
const PORT =5000;

//Mounts customer routes under /customer
// Mounts general routes at /
app.use("/customer", customer_routes);
app.use("/", genl_routes);

//Starts the server and logs a message once it is up.
app.listen(PORT,()=>console.log("Server is running"));
