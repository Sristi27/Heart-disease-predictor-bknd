const express = require('express');
const mongoose = require('mongoose');

const router = express.Router(); 
const Checkup = mongoose.model("Checkup");
const User = mongoose.model("User");

router.post('/saveMedicalData', async (req, res) => {
    const data = req.body;  //email,age,sex,result....
    // console.log(data);
    const existingUser = await User.findOne({email:data.email});  //_id,user,data:[{age,sex,result...}]
    const newCheckupDetails = {
        age:data.age,
        sex:data.sex,
        chestPainType:data.chestPainType,
        pressure:data.pressure,
        cholestrol:data.cholestrol,
        sugar:data.sugar,
        ecg:data.ecg,
        heartRate:data.heartRate,
        angina:data.angina,
        thal:data.thal,
        result:data.result,
        date:new Date()
    };

   const existingUserInCheckup = await Checkup.findOne({user:existingUser._id}); 
   if(!existingUserInCheckup)
   {
       const newData = new Checkup({
           user:existingUser._id,
           data:[]
       });
       await newData.save()
       .then(res=>console.log("Created successfully"))
       .catch(err=>{
        return res.status(404).json({error:'User could not be created!'});
       })
   }

   Checkup.findOneAndUpdate({user:existingUser._id},
        {
            $push:{data:newCheckupDetails}
        })
    .then(()=>{
      console.log("Health data Saved successfully");
      return res.status(200).json({message:'Health checkup details saved successfully'});
    })
    .catch(err => res.status(404).json({error:'Health checkup details could not be saved'}))
  });


  router.get('/getMedicalData/:id',async(req,res)=>{
      const id  = req.params.id;
      const existingUser = await Checkup.findOne({user:id});
      if(existingUser) return res.status(200).json({message:'Checkup history fetched',history:existingUser.data});
      else return res.status(404).json({error:'User not found'});
  })
   
module.exports = router;

