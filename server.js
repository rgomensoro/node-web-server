const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.originalUrl}`;

    console.log(log);

    fs.appendFile('log/server.log',(log + ' \n'), (err) =>{
        if (err){
            console.log('Unable to append to file.');
        }
    });

    next();
});


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Welcome Page',
        welcomeMessage: 'Bem vindo ao Site do Rodrigo.',
    }); 
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({

        errorMessage: 'Something went wrong'

    });
});

    app.listen(port, () => {
        console.log(`Server is up on port ${port}.`);

    });
