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
    // Check if user is logged in and has valid access token
    if (req.session.authorization) {
        //Accesses the authorization object stored in the session
        //Pulls out the accessToken value
        let token = req.session.authorization['accessToken'];
        // Verify JWT token
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next(); // Proceed to    the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
        });
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});
 
const PORT =5000;

//Mounts customer routes under /customer
// Mounts general routes at /
app.use("/customer", customer_routes);
app.use("/", genl_routes);

//Starts the server and logs a message once it is up.
app.listen(PORT,()=>console.log("Server is running"));
