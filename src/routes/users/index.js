const express = require('express');
const router = express.Router();
const users = require('../../models/users/index');

//Fetching all users
router.get('/', async(req,res)=>{
    try {
        console.log(`fetching data`);
        const allUsers = await users.findOneAndDelete({});
        res.json(allUsers);
    } catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

//Posting new user
router.post('/', async(req,res)=>{
    try{
        const newUser = await users.create(req.body );
        res.json(newUser);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


//editing new user
router.put('/:id', async(req,res)=>{
    try{
        console.log(`editing user info`);
        delete req.body._id;
        delete req.body.createdAt;
        const edited = await users.findByIdAndUpdate(req.params.id, {...req.body}, {new:true});
        res.send(edited);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//deleting user 
router.delete('/:id', async(req,res)=>{
    try{
        console.log(`Deleting user`);
        const removed = await users.findByIdAndDelete(req.params.id);
        res.send(`user removed from system`);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;