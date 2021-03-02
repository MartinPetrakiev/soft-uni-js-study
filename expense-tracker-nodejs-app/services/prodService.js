const Expense = require('../models/Expense');

function createExpense(data, userId) {
    const report = data.report ? true : false;
    const total = Number(data.total).toFixed(2);
    let expense = new Expense({ ...data, report, total, creator: userId });
    expense.save();
    return expense._id;
}

function getById(id) {
    return Expense.findById(id).lean();
}

async function getAll(query) {
    let expenses = await Expense.find({}).lean();
    return expenses;
}

async function deleteExpense(id) {
    let expense = await Expense.deleteOne({ _id: { $eq: id } });
    return expense;
}

module.exports = {
    getAll,
    getById,
    createExpense,
    deleteExpense,
};