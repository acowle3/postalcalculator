var http = require('http');
var url = require('url');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 4000));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/results', function(req, res) {
    theWeight(req, res);
})

app.listen(app.get('port'), function() { console.log('Node app is running on port', app.get('port')) });

function theWeight(req, res) {
    var reqUrl = url.parse(req.url, true);
    
    var typeMail = reqUrl.query.typeMail;
    var weight = Number(reqUrl.query.weight);
    
    calculatePostage(res, typeMail, weight);
    
}

function calculatePostage(res, typeMail, weight) {
    var result = 0.0;

    switch (typeMail) {
        case 'Letters (Stamped)':
            if (weight < 1) {
                result = .50;
            } 
            else if (weight < 2) {
                result = .71;
            } 
            else if (weight < 3) {
                result = .92;
            } 
            else if (weight < 3.5) {
                result = 1.13;
            } 
            break;

        case 'Letters (Metered)':
            if (weight < 1) {
                result = .47;
            } 
            else if (weight < 2) {
                result = .68;
            } 
            else if (weight < 3) {
                result = .89;
            } 
            else if (weight < 3.5) {
                result = 1.10;
            } 
            break;

        case 'Large Envelopes (Flats)':
            if (weight < 1) {
                result = 1;
            } 
            else if (weight < 2) {
                result = 1.21;
            } 
            else if (weight < 3) {
                result = 1.42;
            } 
            else if (weight < 4) {
                result = 1.63;
            } 
            else if (weight < 5) {
                result = 1.84;
            } 
            else if (weight < 6) {
                result = 2.05;
            } 
            else if (weight < 7) {
                result = 2.26;
            } 
            else if (weight < 8) {
                result = 2.47;
            } 
            else if (weight < 9) {
                result = 2.68;
            } 
            else if (weight < 10) {
                result = 2.89;
            } 
            else if (weight < 11) {
                result = 3.10;
            } 
            else if (weight < 12) {
                result = 3.31;
            } 
            else if (weight < 13) {
                result = 3.52;
            } 
            break;

        case 'First Class Package Service':
            if (weight < 1) {
                result = 3.50;
            } 
            else if (weight < 2) {
                result = 3.5;
            } 
            else if (weight < 3) {
                result = 3.5;
            } 
            else if (weight < 4) {
                result = 3.50;
            } 
            else if (weight < 5) {
                result = 3.75;
            } 
            else if (weight < 6) {
                result = 3.75;
            } 
            else if (weight < 7) {
                result = 3.75;
            } 
            else if (weight < 8) {
                result = 3.75;
            } 
            else if (weight < 9) {
                result = 4.10;
            } 
            else if (weight < 10) {
                result = 4.45;
            } 
            else if (weight < 11) {
                result = 4.80;
            } 
            else if (weight < 12) {
                result = 5.15;
            } 
            else if (weight < 13) {
                result = 5.50;
            } 
            break;
    }

    var result = result.toString();
    
    var params = { typeMail: typeMail, weight: weight, result: result };

    res.render('results', params);
    
}