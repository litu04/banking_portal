const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const {accounts,users,writeJSON} = require('./data');

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.use('/account',accountRoutes);
app.use('/services',servicesRoutes);

// const accountData = fs.readFileSync("./json/accounts.json","utf-8");
// //console.log(accountData);
// const accounts = JSON.parse(accountData);
// //console.log("account details",accounts);

// const userData = fs.readFileSync('./json/users.json',"utf-8");
// const users = JSON.parse(userData);
// //console.log("user details",users);



app.get('/',function(req,res){

    return res.render('index',{
        title: 'Account Summary',
        accounts: accounts
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