const mongoose = require('mongoose');
const englishAlphanumericPattern = /^[A-Z0-9]+$/i;

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        validate: {
            validator: (value) => {
                return englishAlphanumericPattern.test(value)
            },
            message: (prop) => {
                return `${prop.value} is invalid! Username should consist of only English letters and digits.`
            }
        }

    },  
    password: {
        type: String,
        required: true,
        minLength: 8, 
        validate: {
            validator: value => {
                return englishAlphanumericPattern.test(value);
            },
            message: (prop) => {
                return `Passowrd should consist of only English letters and digits.`
            }
        }
    }
});

module.exports = mongoose.model('User', userSchema);