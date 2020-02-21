const express = require('express');
const router = express.Router();
const users = require('../../models/users/index');
const ObjectId = require('mongoose').Types.ObjectId;

//Fetching all users
router.get('/', async (req, res) => {
    try {
        console.log(`fetching data`);
        const allUsers = await users.find({});
        res.json(allUsers);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    };
})

//Posting new user
router.post('/', async (req, res) => {
    try {
        const newUser = await users.create(req.body);
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})


//editing new user
router.put('/:id', async (req, res) => {
    try {
        console.log(`editing user info`);
        delete req.body._id;
        delete req.body.createdAt;
        const edited = await users.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.send(edited);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})

//deleting user 
router.delete('/:id', async (req, res) => {
    try {
        console.log(`Deleting user`);
        const removed = await users.findByIdAndDelete(req.params.id);
        res.send(`user removed from system`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
})

router.get('/:id/experience', async (req, res) => {
    try {
        console.log(`fetching user experience`);
        const user = await users.findById(req.params.id);
        if (!user) {
            res.json(`user has no experience`);
        } else {
            res.json(user.experiences);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/:id/experience', async (req, res) => {
    try {
        console.log(`Posting experience into user`);
        // const newExperience = req.body;
        const experience = await users.findByIdAndUpdate(req.params.id, { $push: { experiences: req.body } }, { new: true });
        console.log(experience);
        res.json(experience)
    } catch (err) {
        console.log(`Error posting experience`, err);
        res.status(500).json(err);
    }
})

router.patch('/:id/experience/:expid', async (req, res) => {
    try {
        console.log('Console');
        console.log('req', req.params.id);
        console.log('body', req.body)
        // delete req.body.experience._id;
        const id = new ObjectId(req.params.id)
        const expid = new ObjectId(req.params.expid)
        const edited = await users.findOneAndUpdate(
            {
            _id: id,
            "experiences._id": expid
        }, {
            "experiences.$": req.body
        },)
        console.log(edited);
        res.json(`edited`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.delete('/:id/experience/:expid', async(req,res)=>{
    try{
        console.log('deleting experience');
        const id = new ObjectId(req.params.id);
        const expid = new ObjectId(req.params.expid);
        const user = await users.findOneAndUpdate({
            _id: id}, { $pull : {experience : {_id: expid}}});
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;