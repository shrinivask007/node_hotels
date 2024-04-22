const express = require('express');
const router= express.Router();

const menuItems=require('./../models/menuItems');

router.post('/', async (req, res) => {
    try {
        const data = req.body; 
        const newMenu = new menuItems(data);
        const savedMenu= await newMenu.save();
        console.log('Data saved successfully');
        res.status(200).json(savedMenu);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to retrieve all menu items
router.get('/', async (req, res) => {
  try {
      const data = await menuItems.find();
      console.log('Data fetched');
      res.status(200).json(data);
  } catch (err) {
    console.error(err);
      res.status(500).json({error:'Internal server error'});
  }
});


module.exports =router;