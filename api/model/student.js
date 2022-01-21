const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    gender: String,
    phone: Number,
    email: String,
    imageUrl: String
})

module.exports = mongoose.model("Student",studentSchema)