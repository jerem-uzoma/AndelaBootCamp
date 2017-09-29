var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//routes
app.use(bodyParser.json());

app.use(require('./controllers'));

app.listen('3000', function() {
    console.log('server is running')
});