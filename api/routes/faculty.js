const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Faculty get response'
    })
})

router.post('/',(req,res,next) => {
    res.status(200).json({
        message: 'Faculty post response'
    })
})

module.exports = router;