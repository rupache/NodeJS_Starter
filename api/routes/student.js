const express = require('express');
const Student = require('../model/student');
const mongoose = require('mongoose')
const router = express.Router();
const checkauth = require('../middleware/check-auth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: '<<ADD HERE>>',
    api_key: '<<ADD HERE>>',
    api_secret: '<<ADD HERE>>'
});

router.post('/upload', (req, res, next) => {
    console.log(req.body)
    const file = req.files.photo

    cloudinary.uploader.upload(file.tempFilePath,(err, result)=>{
        console.log(result);
    })
})

router.get('/', checkauth, (req, res, next) => {
    Student.find()
        .then(result => {
            res.status(200).json({
                studentData: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
})

router.get('/:id', (req, res, next) => {
    const _id = req.params.id;
    Student.findById(_id)
        .then(result => {
            res.status(200).json({
                student: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', (req, res, next) => {

    const file = req.files.photo

    cloudinary.uploader.upload(file.tempFilePath,(err, result)=>{
        const _student = new Student({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
            gender: req.body.gender,
            phone: parseInt(req.body.phone),
            email: req.body.email,
            imageUrl: result.url
        })
    
        _student.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    newStudent: _student
                })
            })
            .catch(error => {
                console.log(error);
                res.status(404).json({
                    error: error.message
                })
            })
    })

    
})

// Update Logic
router.put('/:id', (req, res, next) => {
    const _id = req.params.id;
    Student.findOneAndUpdate({ _id: _id }, {
        $set: {
            name: req.body.name,
            gender: req.body.gender,
            phone: req.body.phone,
            email: req.body.email
        }
    })
        .then(result => {
            res.status(200).json({
                result: result
            })
        })
        .catch(updateerror => {
            res.status(500).json({
                error: updateerror
            })
        })
})



module.exports = router;