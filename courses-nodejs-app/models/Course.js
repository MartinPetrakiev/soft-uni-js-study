const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
    },
    duration : {
        type: String
    },
    dateCreated: {
        type: String,
        required: true
    },
    enrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Course', courseSchema);