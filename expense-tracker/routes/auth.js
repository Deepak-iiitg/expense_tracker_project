const express = require('express');
const router = express.Router();
const authUser = require('../controllers/Auth.js');
const expenseController = require('../controllers/ExpenseControllers.js');
router.post('/auth/signup',authUser.register);
router.post('/auth/login',authUser.login);
router.get('/auth/logout',authUser.logout);
router.post('/expense',expenseController.AddExpense);
router.get('/expense/yearly/:email',expenseController.getYearlyExpense);
router.get('/expense/monthly/:email',expenseController.getMonthlyExpense);
router.get('/expense/daily/:email',expenseController.getDailyExpense);
router.get('/expense/leaderboard',expenseController.leaderboard);
router.get('/expense/cookie',expenseController.getCooki);
router.get('/expense/protecting',expenseController.getCooki);

module.exports = {router};