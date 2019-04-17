
// call the http lib
const express = require('express');
const path = require('path');
const fs = require('fs');
var engines = require('consolidate');
var bodyParser = require('body-parser');


const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());                        
app.engine('html', engines.mustache);



router.get('/',function(request, response) {
    // Read names from file
    var names_list = fs.readFileSync('names.txt','utf8')
    response.render('home.html', { root: __dirname, names :names_list });
});

router.post('/add_name', function(request, response) {
    var new_name = request.body.new_name + "\n";
    fs.appendFile('names.txt', new_name, function(err){
        if (err) { console.log("Error in write file!"); }
    });
    response.redirect('/');
})

app.use('/', router)
app.listen(3000)
console.log('Running at port 3000');