const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');


async function register({ username, password, amount }) {
    const hash = bcrypt.hashSync(password, SALT_ROUNDS);
    const user = new User({ username, password: hash, amount });

    return await user.save();
}

async function login({ username, password }) {
    const user = await User.findOne({ username }).lean();
    if (!user) {
        throw new Error('No such user found!');
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
        throw new Error('Invalid password!');
    }
}

async function refillAccount(id, data) {
    const amountAdd = Number(data.amount);
    let updatedUser = await User.updateOne({ _id: { $eq: id } }, { $inc: { amount: amountAdd } });
    return updatedUser;
}

async function updateExpenses(userId, expenseId) {
    let updatedUser = await User.updateOne({ _id: { $eq: userId } }, { $push: { expenses: expenseId } });
    return updatedUser;
}

async function getUserData(id, res) {
    let user = await User.findById(id, function (err, doc) {
        if (err) res.status(404).end();
    }).lean();
    return userInfo = {
        id: user._id,
        username: user.username,
        totalAmount: 0,
        expenses: user.expenses.length,
        availableAmount: user.amount.toFixed(2)
    };
}

module.exports = {
    register,
    login,
    refillAccount,
    updateExpenses,
    getUserData
}