const express = require('express');
const hbs = require('hbs')
const path = require('path'); // path used to change existing directory path   (core module of Node JS)
const geoCode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast')

console.log(__dirname);
console.log(path.join(__dirname, '../public'));


const app = express(); // express is a single function % create express application 

// app load in browser and server config done with express js library.
// express and handle req and res , send back res to browser
// req -  incoming request 
// res -  response

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
//create setting for custom view path
const viewPath = path.join(__dirname, '../templates/views')
const paritalPath = path.join(__dirname, '../templates/paritals')


// setup handlebars js  and handlebars used to inject the dynamic value
app.set('view engine', 'hbs') // set setting for express js
app.set('views', viewPath)
hbs.registerPartials(paritalPath);

// setup static directory for serve
app.use(express.static(publicDirPath));
// app.get('', (req, res) => {
//     res.send('<h1>express!</h1>')
// })

// we can use handlebars file for dynamic content for that also create root for this
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        footerTitle: 'created by Siddharth'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {   // get data from query string
        return res.send({
            error: 'Please provide address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude } = {}) => {
        console.log(latitude, longitude);
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, { tempautre }) => {   // callback chaining 
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: tempautre,
                location: req.query.address,
                address: req.query.address
            })
        })

    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page hbs',
        footerTitle: 'created by siddharth'
    })
})

// widcards routes

app.get('/help/*', (req, res) => {  // to solve the issue we can write also ( for url like help/data)
    res.send('Help page data not found')
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: '404 . Page Not found.'
    })
})


// app.get('/help', (req, res) => {
//     res.send({
//         name:'siddharath',         // express automactically stringify the JSON data 
//         Age: 27                     // also we will pass arraay of object easily
//     })
// })

// app.get('/about', (req, res) => {
//     res.send({
//         name:'siddharath',         
//         Age: 27                 
//     })
// })


// start the server with the help of listen function 
app.listen(3000, () => {
    console.log('server is up!');
})