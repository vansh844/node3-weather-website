const path=require('path')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const express=require('express')
const hbs=require('hbs')

const app=express()

// Define paths for express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

//Setup handlebars and path
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Vansh'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Vansh',
        helpText:'Need help?'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"No address"
        })
    }

    
    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                location:location,
                forecast:forecastData
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:"No search"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        name:'Vansh Gandhi',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        name:'Vansh Gandhi',
        errorMessage:'Page not found'
    })
})

app.listen(3000)