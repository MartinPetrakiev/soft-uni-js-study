const { Router } = require('express');
const prodService = require('../services/prodService');
const authService = require('../services/authService');
const isAuth = require('../middlewares/isAuth');
const isGuest = require('../middlewares/isGuest');
const expenseValidator = require('../middlewares/expenseValidator');

const router = Router();

router.get('/', isGuest, (req, res) => {
    res.render('home/home');
});

router.get('/expenses', isAuth, (req, res) => {
    prodService.getAll(req.query)
        .then(expenses => {
            const expnesesArray = Object.entries(expenses)
                .map((x) => x = x[1])
                .filter(x => x.creator.toString() === req.user.id.toString())
                .map(x => ({ ...x, total: x.total.toFixed(2) }))
                .map(x => ({
                    ...x,
                    category: (x.category.charAt(0).toUpperCase() + x.category.slice(1)).split('-').join(' ')
                }))
            res.render('expenses/expenses', { expnesesArray });
        })
        .catch(() => res.status(400).end());
});

router.get('/expense/create', isAuth, (req, res) => {
    res.render('expenses/create');
});

router.get('/expense/report/:id', isAuth, async (req, res) => {
    let expense = await prodService.getById(req.params.id);
    expense.category = (expense.category.charAt(0).toUpperCase() + expense.category.slice(1)).replace('-', " ");
    const creator = await expense.creator.toString() === req.user.id.toString();
    res.render('expenses/report', { expense, creator });
});

router.get('/expense/delete/:id', isAuth, async (req, res) => {
    prodService.deleteExpense(req.params.id)
        .then(() => res.redirect('/expenses'))
        .then(() => res.status(400).end());
});

router.post('/expense/create', isAuth, expenseValidator, async (req, res) => {
    try {
        const createId = await prodService.createExpense(req.body, req.user.id);
        const updateExpenses = await authService.updateExpenses(req.user.id, createId);
        res.redirect(`/expenses`)
    } catch (error) {
        console.log(error);
        res.status(500).end()
    }
});

router.get('/account/refill', isAuth, async (req, res) => {
    try {
        const refill = await authService.refillAccount(req.user.id, req.query);
        res.redirect(`/expenses`)
    } catch (error) {
        console.log(error);
        res.status(400).end()
    }
});


module.exports = router;