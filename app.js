const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    // dotenv = require('dotenv'), // debug local
    expressSanitizer = require('express-sanitizer'),
    methodOvrd = require('method-override'),
    blogRoute = require('./routes/blogs'),
    weatherRoute = require('./routes/weather');

// #############################################################################

// ####### config ->

app.use(methodOvrd('_method'));
app.set('trust proxy', true);
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
// dotenv.config(); // debug local

// db connection -->

const db = mongoose.connection;
mongoose.connect(process.env.MONGO_ACCESS_URI , {useNewUrlParser: true, useUnifiedTopology: true});

db.then(() => {
    console.log("MongoDB connected!");
})
.catch(err => console.log(err));

db.on('error', (err) => {
    console.log(err);
})

// ########### App code ->
app.get('/', (req,res) => {    
    res.redirect("/blogs");
});

// Use routes ->
app.use('/blogs', blogRoute);
app.use('/weather', weatherRoute);

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
    res.json({
        at: new Date().toISOString(),
        method: req.method,
        hostname: req.hostname,
        ip: req.ip,
        query: req.query,
        headers: req.headers,
        cookies: req.cookies,
        params: req.params
    })
    .end()
})

module.exports = app;