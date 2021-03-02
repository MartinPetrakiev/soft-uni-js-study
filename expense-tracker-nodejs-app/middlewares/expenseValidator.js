
module.exports = (req, res, next) => {
    const { merchant, total, category, description } = req.body;
    if (!merchant || !description || !category || !total) {
        const error = 'Expense merchant, total, category and description are required fields.';
        return res.render('expenses/create', { notification: { error }, merchant, total, description });
    }
    if (merchant.length < 4) {
        const error = 'Merchant must be at least 4 characters.';
        return res.render('expenses/create', { notification: { error }, merchant, total, description });
    }
    if (Number(total) < 0) {
        const error = 'Total should be positive number!';
        return res.render('expenses/create', { notification: { error }, merchant, description });
    }
    if (description.length < 3 || description.length > 30) {
        const error = 'Description should be minimum 3 characters long and 30 characters maximum.';
        return res.render('expenses/create', { notification: { error }, merchant, total, category });
    }
    next();
}