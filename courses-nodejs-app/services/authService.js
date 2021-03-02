const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');


async function register({ username, password }) {
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);
    const user = new User({ username, password: hash });

    return await user.save();
}

async function login({ username, password }) {
    const user = await User.findOne({ username }).lean();
    if (!user) {
        throw new Error('Invalid credentials!');
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        const token = jwt.sign({
            id: user._id,
            username: user.username,
        },
            SECRET);
        return token;
    } else {
        throw new Error('Invalid credentials!');
    }
}

// async function getUserData(id, res) {
//     let user = await User.findById(id, function (err, doc) {
//         if (err) res.status(404).end();
//     }).lean();
//     return userInfo = {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email
//     };
// }

module.exports = {
    register,
    login,
    // getUserData
}