const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

// const accountData = fs.readFileSync("./json/accounts.json","utf-8");
// //console.log(accountData);
// const accounts = JSON.parse(accountData);
// //console.log("account details",accounts);

// const userData = fs.readFileSync('./json/users.json',"utf-8");
// const users = JSON.parse(userData);
// //console.log("user details",users);

const accountData = fs.readFileSync(
    path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
    path.join(__dirname, 'json', 'users.json'), 'utf8'
)
const users = JSON.parse(userData);

// const writeJSON = () => {
//     var accountsJSON = JSON.stringify(accounts, null, 4);
//     fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

// }

app.get('/',function(req,res){

    return res.render('index',{
        title: 'Account Summary',
        accounts: accounts
    })
})

app.get('/savings',function(req,res){

    return res.render('account',{
        account: accounts.savings
    })
})

app.get('/checking',function(req,res){

    return res.render('account',{
        account: accounts.checking
    })
})

app.get('/credit',function(req,res){

    return res.render('account',{
        account: accounts.credit
    })
})

app.get('/profile',function(req,res){
    return res.render('profile',{
        user:users[0]
    })
})

app.get('/transfer',function(req,res){

    return res.render('transfer')
})

app.post('/transfer',(req,res) => {
    console.log("from: ",req.body.from);
    console.log("to: ",req.body.to);
    console.log("amount transfered: ",req.body.amount);
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount);
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

    res.render('transfer',{
        message: 'Transfer Completed'
    });
})

app.get('/payment',function(req,res){

    return res.render('payment',{
        account: accounts.credit
    })
})

app.post('/payment',(req,res) => {
    console.log("payment amount: ",req.body.amount);
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = parseInt(accounts.credit.available,10) + parseInt(req.body.amount,10);
    const accountsJSON = JSON.stringify(accounts, null, 4);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

    res.render('payment',{
        message: "Payment Successfull",
        account: accounts.credit
    })
})

app.listen(3000,function(err){
    if(err){
        console.log("error in creating server",err);
        return;
    }
    console.log("PS Project Running on port 3000!");
})