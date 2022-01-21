const express = require('express');
const User = require('../model/user');
const mongoose = require('mongoose')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'User get response'
    })
})

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: req.body.userType
            })

            user.save()
                .then(result => {
                    res.status(200).json({
                        response: user
                    })
                })
                .catch(saveerr => {
                    res.status(500).json({
                        response: saveerr
                    })
                })
        }
    })
})


router.post('/login', (req, res, next) => {
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                error: 'User doesn\'t exists'
            })
        }
        bcrypt.compare(req.body.password,user[0].password, (err, result) => {
            if (!result) {
                return res.status(500).json({
                    error: 'Password doesn\'t match'
                })
            }
            else{
                const token = jwt.sign({
                    username: user[0].username,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone
                },
                'this is dummy text',
                {
                    expiresIn: "24h"
                })

                res.status(200).json({
                    username: user[0].username,
                    userType: user[0].userType,
                    email: user[0].email,
                    phone: user[0].phone,
                    token: token
                })
            }
            
        })
    })
    .catch(errres => {
        res.status(500).json({
            res: errres
        })
    })

})

module.exports = router;