
// call the http lib
const express = require('express');
const path = require('path');
const fs = require('fs');
var engines = require('consolidate');

const app = express();
const router = express.Router();

app.engine('html', engines.mustache);

var names_list = fs.readFileSync('names.txt','utf8')

router.get('/',function(request, response){
    var name = "check maya";
    response.render('home.html', { root: __dirname, names :names_list });
});

app.use('/', router)
app.listen(3000)
console.log('Running at port 3000');