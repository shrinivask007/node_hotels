const express = require('express')
const app = express();
const db= require('./db');
require ('dotenv').config();
//This is server

app.get('/', function (req, res) {
  res.send('Hi am shree')
})

const bodyParser =require('body-parser');
app.use(bodyParser.json());  //store at req.body


const personRoutes =require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuItemsRoutes =require('./routes/menuItemsRoutes');
app.use('/menuItems', menuItemsRoutes);


app.listen(process.env.PORT || 3000, ()=>{
  console.log('listining on port 3000')
})