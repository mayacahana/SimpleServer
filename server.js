
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

// MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/DBnames', { useNewUrlParser: true });
var db = mongoose.connection;
var Schema = mongoose.Schema;

var nameSchema = new Schema({
    name: String, 
});

var namesModel = mongoose.model('namesModel', nameSchema );


// GET request
router.get('/',function(request, response) {
    // Read names from file
    var names_list = fs.readFileSync('names.txt','utf8')
    response.render('home.html', { root: __dirname, names :names_list });
});

// POST request
router.post('/add_name', function(request, response) {

    var new_name = request.body.new_name;
    var new_item = new namesModel({name: new_name});
    // new_item.save(function (err) {
    //     if (err) return handleError(err); 
    // } );
    // namesModel.find({}, function(err, users) {
    //     var namesString = "";
    
    //     users.forEach(function(user) {
    //       namesString += user + "\n";
    //     });
    // console.log(namesString);
    fs.appendFile('names.txt', new_name + "\n", function(err){
        if (err) { console.log("Error in write file!"); }
    });

    response.redirect('/');
})

app.use('/', router)
app.listen(3000)
console.log('Running at port 3000');