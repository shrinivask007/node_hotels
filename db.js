const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL= 'mongodb://localhost:27017/firstdb'
//const mongoURL = 'mongodb+srv://shrinivassk18:Shree1234@cluster0.dqlz8al.mongodb.net/'


//Set up MongoDB connection
mongoose.connect(mongoURL,{
    // useNewUrlParser: true,
    // useUnifiedTopology:true
})

//Get the default connection
//Mongoose 
const db=mongoose.connection;


//event listner
db.on('connected',()=>{
    console.log("Connected to Mongodb Server");
})

db.on('error',(err)=>{
    console.log(" Mongodb connection",err);
})

db.on('disconnected',()=>{
    console.log("disconnected to Mongodb Server");
})

//Export the database Connection
module.exports=db;

