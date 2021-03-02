const User = require('../models/User');
const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV.trim() || 'development';
const { SALT_ROUNDS, SECRET } = require('../config/config')[env];
const jwt = require('jsonwebtoken');


async function register({ username, password }) {
    const isExist = await User.findOne({ username }).lean();
    if (isExist) {
        throw { message: 'Username has already been taken!' };
    }

    const hash = bcrypt.hashSync(password, SALT_ROUNDS);
    const user = new User({ username, password: hash });

    return await user.save();
}

async function login({ username, password }) {
    const user = await User.findOne({ username }).lean();
    if(!user) {
        throw { message: 'Invalid credentials!'};
    }

    const match = await bcrypt.compare(password, user.password);
   
    if (match) {
        const token = jwt.sign({ id: user._id }, SECRET);
        return token;
    } else {
        throw { message: 'Invalid credentials!'};
    }
}

module.exports = {
    register,
    login
}