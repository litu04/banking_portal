const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'));

app.get('/',function(req,res){

    return res.render('index',{
        title: 'Index'
    })
})

app.listen(3000,function(err){
    if(err){
        console.log("error in creating server",err);
        return;
    }
    console.log("PS Project Running on port 3000!");
})