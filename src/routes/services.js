const express = require('express');

const router = express.Router();

const {accounts,writeJSON} = require('../data');

router.get('/transfer',function(req,res){

    return res.render('transfer')
})

router.post('/transfer',(req,res) => {
    //console.log("from: ",req.body.from);
    //console.log("to: ",req.body.to);
    //console.log("amount transfered: ",req.body.amount);
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount);
    writeJSON();

    res.render('transfer',{
        message: 'Transfer Completed'
    });
})

router.get('/payment',function(req,res){

    return res.render('payment',{
        account: accounts.credit
    })
})

router.post('/payment',(req,res) => {
    //console.log("payment amount: ",req.body.amount);
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount,10);
    writeJSON();

    res.render('payment',{
        message: "Payment Successfull",
        account: accounts.credit
    })
})

module.exports = router;