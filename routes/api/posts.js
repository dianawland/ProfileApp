const express = require('express');
const router = express.Router();

//@route-- GET api/posts
//@desc-- Test route
//@access-- public atau private

router.get('/', (req, res)=> res.send('Posts route'));


//export route
module.exports = router;