const mongoose = require('mongoose');
const englishAlphanumericPattern = /^[A-Z0-9\s]+$/i;

const accessorySchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        required: true,
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
    description: {
        type: String,
        required: true,
        maxlength: 20,
        validate: {
            validator: (value) => {
                return englishAlphanumericPattern.test(value)
            },
            message: (prop) => {
                return `${prop.value} is invalid! Username should consist of only English letters and digits.`
            }
        }
    },
    imageUrl: {
        type: String,
        required: true,
        validate: /^https?/
    },
    cubes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }]
});


module.exports = mongoose.model('Accessory', accessorySchema);