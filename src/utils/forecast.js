const request=require('request')

const forecast=(latitude, longitude, callback)=>{
    const url='https://api.darksky.net/forecast/ac000b8fa81a8b3182ddae9f9e97642f/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    request({url, json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to weather service')
        }else if(body.error){
            callback('Unable to find location')
        }else{
            console.log(body.daily.data[0])
            callback(undefined,body.daily.data[0].summary+ ' It is currently '+body.currently.temperature+' degrees out. The high today is '+body.daily.data[0].temperatureHigh+' with a low of '+body.daily.data[0].temperatureLow+'. There is '+body.currently.precipProbability+'% chance of rain.')
        }
    })
}

module.exports=forecast