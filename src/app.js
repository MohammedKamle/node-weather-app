const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// to start app on heroku, it will take PORT from env variable, for local it will be port 3000
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup views location and handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// loading partilas
hbs.registerPartials(partialPath)

//Setup static directory to serve   
// below will find and load index.html automatically from the specified directory, also load the css,js and img file
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Mohammed Kamle"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Mohammed Kamle"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "Mohammed Kamle",
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error: error })
        }
        const { latitude, longitude, location } = data  // object destructuring
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// if a user is on certail page and he is using some incorrect endpoint
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mohammed Kamle',
        errorMessage: 'Help article not found'
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        producs: []
    })
})

// this always comes at the end 
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mohammed Kamle',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server up and running at port ' + port)
})