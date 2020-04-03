const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');

router.post('/', async (req,res)=>{
   const newUser = req.body;
   const user = new User(newUser);

   try{
       await user.generationToken();
       await user.save();
       res.send(user)
   }catch (e) {
       res.status(404).send({error: 'Not found!!!'})
   }
});


router.post('/sessions', async (req,res)=>{
   const userData = req.body;
   const user = await User.findOne({username: userData.username});
   if (!user){
       res.status(401).send({username: 'Username in correct!!!'})
   }
   const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch){
        res.status(401).send({password: 'Password in correct!!!'})
    }

    try{
        await user.generationToken();
        await user.save();
        res.send(user)
    }catch (e) {
        res.status(404).send({error: 'Not found!!!'})
    }
});

router.delete('/sessions', async (req,res)=>{
    const success = {message: 'Bye'};

    const token = req.get('Authorization');
    if (!token) return res.send(success);

    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generationToken();
    await user.save();
    return res.send(success);
});

module.exports = router;