const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000;

console.log(__dirname)
console.log(__filename)


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')



//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('weather')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

app.get('/about', (req, res) => {

    res.render('about',{

        title: 'About Me',
        name:'Jisnu Kumar'
    })
   
})

app.get('/help', (req, res) => {

    res.render('help',{

        name:'Jisnu Kumar',
        helpText:"This is some helpfull text"

    })
   
})

app.get('',(req, res)=>{
    res.render('index',{

        title: 'Weather',
        name:'Jisnu Kumar'


    })

})

app.get('/weather', (req, res) => {

    if(!req.query.address){

       return res.send({
            error :"You must enter an address!!"
        })

    }
    let address = req.query.address
    
    geocode(address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error: error

            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast:forecastData,
                address: req.query.address,
                location:location,
                coordinates: "latitude "+latitude +", longitude "+longitude
            })

            
        })
     })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){

        return res.send({
            error: "You must provide a search term"
        })

        

    }
    
    res.send({
        products:[]
    })



})

app.get('/help/*',(req,res)=>{

    res.render('404',{
        errorMessage: 'The Related Help article not found',
        name:'Jisnu Kumar',
        title:404
    })

    

})

app.get('*',(req,res)=>{

    res.render('404',{
        errorMessage: "Page Not Found.",
        name:'Jisnu Kumar',
        title:404
    })


})

app.listen(port, () => {
    console.log('Server is up on port '+port + ".")
})