const express = require('express');
const router= express.Router();

const Person=require('./../models/person');

router.post('/',async(req,res)=>{
    try{  
     const data=req.body //Asumming the request body contains the person data
     //Create a new Person document using the mongoose model
     const newPerson = new Person(data);
    // save the new person to the database
    const savedPerson = await newPerson.save();
    console.log('Data Saved successfully');
     res.status(200).json(savedPerson);
    }
    catch(err){
   console.log(err);
   res.status(500).json({error:'Internal server error'})
    }
 })

 
router.get('/',async (req,res)=>{
    try{
     const data = await Person.find();
     console.log('Data fetched');
      res.status(200).json(data);
    }catch(err){
      console.log(err);
      res.status(500).json({erro:'Internal server error'})
    }
  })


  router.get('/:workType', async (req, res) => {
    try {
      const workType = req.params.workType;
      if (workType == 'Manager' || workType == 'Software Engineer') {
        const response = await Person.find({ occupation: workType });
        console.log('Data fetched');
        res.status(200).json(response); 
      } else {
        res.status(404).json('Invalid Type'); // Changed to 'res.status(404).json('Invalid Type')'
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
        const person_id = req.params.id; // Extract id from the URL parameter
        const updatePersonData = req.body; // Update data for person
        
        const response = await Person.findByIdAndUpdate(person_id, updatePersonData, {
            new: true, // Return the updated document
            runValidators: true // Run the Mongoose validator
        });
        
        if (!response) {
            res.status(404).json({ error: 'Person Not Found' });
        }
        console.log('Data Updated');
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const person_id = req.params.id; // Extract id from the URL parameter
        const response = await Person.findByIdAndDelete(person_id);
        if (!response) {
            res.status(404).json({ error: 'Person Not Found' });
        }
        console.log('Data Deleted');
        res.status(200).json({ message: 'Person Deleted Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



  module.exports =router;