const request=require('request')

const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmFuc2g4NDQiLCJhIjoiY2syMWczbnpxMDgzbDNicGFrN2JxNnI0aCJ9.mzp-yjKUspV4_M9gqndajg'
    request({url, json:true},(error, {body})=>{
        if(error){
            callback('Unable to conect to the location services!', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode