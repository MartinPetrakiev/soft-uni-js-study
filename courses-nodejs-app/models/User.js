const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.post('save', function (error, doc, next) {
    console.log(error);
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Username already in use!'));
    } else {
        next();
    }
});

module.exports = mongoose.model('User', userSchema);