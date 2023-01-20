const request = require('postman-request');
// now we are implemeting callback function with the help we execute API.
// creating function for resuablity.

const geoCode = (address, callback) => {
    const geoCodingApiURL = 'http://api.positionstack.com/v1/forward?access_key=37ce8845175244ee8ed1a18e9369b233&query=' + address;
    request(geoCodingApiURL, { json: true }, function (error, {body}) {  //  removed respone and use object destucting
        if (error || body.error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.data?.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,

            })
        }

    });

}

module.exports = geoCode;