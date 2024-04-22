const mongoose = require('mongoose');

const menuItemSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:Number,
    ingredient:['chicken wings','spices','sauce']

})

// Create a model based on the schema
const menuItems = mongoose.model('menuItems', menuItemSchema);

module.exports = menuItems;
