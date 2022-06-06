const express = require('express');
const mongoose = require('mongoose');

const router = express.Router(); 
const User = mongoose.model("User");
const { OAuth2Client } = require('google-auth-library'); 

const clientId =
    "893518889771-8rrmcfsksof02js275v6qosubdjqufun.apps.googleusercontent.com"; 
const client = new OAuth2Client(clientId);

router.post('/api/google-login', async (req, res) => {
    const { token } = req.body; 
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email } = ticket.getPayload(); 
    //save in databse
     const existingUser = await User.findOne({email});
     if(!existingUser)
     {
        const user = new User({name,email});
        user.save().then(()=>{
          console.log("Saved successfully");
          return res.status(201).json({message:'User Saved - Success',user:user});
        }).catch(err=>{
          console.log(err);
          return res.status(404).json({message:'Failed,user could not be saved',});
        });
     }
     else
     {
       return res.status(201).json({message:'User Found - Success',user:existingUser});
     }
  });
   
module.exports = router;