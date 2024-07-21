const router =require('express').Router();
const Pin = require("../models/pin");

router.post("/",async(req,res)=>{
 const newpin= new Pin(req.body)
 try{
   const savedpin = await newpin.save();
   res.status(200).json(savedpin)
 }   catch(err){
    res.status(500).json(err)
 }
} );

router.get("/", async(req,res)=>{
  try{
    const pins= await Pin.find();
    res.status(200).json(pins)
  }
  catch(err){
    res.status(500).json(err)
  }

})
module.exports= router;