const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));

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

app.listen(3000,function(err){
    if(err){
        console.log("error in creating server",err);
        return;
    }
    console.log("PS Project Running on port 3000!");
})