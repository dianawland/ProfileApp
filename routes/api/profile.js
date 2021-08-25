const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require("express-validator");

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route-- GET api/profile/me
//@desc-- Get current users profile
//@access-- private

router.get('/me', auth, async (req, res)=> {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',['name','avatar']);
    
        if(!profile) {
        return res.status(400).json({ msg: 'Tidak ada profile untuk user ini'});

    }

    res.json(profile);
    } catch(err){
        console.error(err.message);
res.status(500).send('Server Error');
}
});

//@route-- POST api/profile 
//@desc-- Create OR Update users profile
//@access-- private

router.post(
    '/',
    [
        auth, 
    [
            check ('status','Status is required')
            .not()
             .isEmpty(),
             check('skils','Skills is required')
            .not()
            .isEmpty()
     ]
    ], async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skils,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //build profile project 
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if (skils) {
        profileFields.skils = skils.split(',').map(skils => skils.trim());
    }
    console.log(profileFields.skils);
    res.send(profileFields.skils);
    });

    //build social object 
    const profileFieldssocial = {} 
    if ('youtube') profileFieldssocial.youtube
    if ('twitter') profileFieldssocial.twitter 
    if ('facebook') profileFieldssocial.facebook 
    if ('linkedin') profileFieldssocial.linkedin 
    if ('instagram') profileFieldssocial.instagram 


        try{
            async function start(req, res){
           let profile = await Profile.findOne({ user : req.user.id });
            }
            if (profile) {

                //update profile
                async function start(req,res ){
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id},
                    { $set: profileFields },
                    { new: true }
                );
                }
                return res.json(profile);
            }

            //create profile 
            async function profileFields(req,res){
            profile = new profile(profileFields);
            
            await profile.save();
            res.json(profile);
            }
        } catch(err,res) => {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    
    


// export route
module.exports = router;