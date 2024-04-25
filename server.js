const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const Person = require('./models/person');
const bodyParser = require('body-parser');
const passport= require('./auth');

app.use(passport.initialize());
app.use(bodyParser.json()); // Store at req.body

// Middleware
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();
}


// Middleware Function
app.use(logRequest); // Log timing 
const localAuthMidddleware =passport.authenticate('local', { session: false })
app.get('/' , function (req, res) {
    res.send('Hi, I am Shree');
});
//localAuthMidddleware,
const personRoutes = require('./routes/personRoutes');
app.use('/person',localAuthMidddleware, personRoutes);

const menuItemsRoutes = require('./routes/menuItemsRoutes');
app.use('/menuItems', menuItemsRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});
