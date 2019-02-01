const https = require("https");

module.exports.getCities = function getCities(cb) {

    let options = {
        method: "GET",
        host: "api.openaq.org",
        path: "/v1/cities?country=GB&limit=200"
    };

    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        }

        let body = "";

        resp.on("data", chunk => {
            body += chunk;
        });

        resp.on("end", () => {
            let parsedBody = JSON.parse(body);
            let list = [];
            for (var i = 0; i < parsedBody.results.length; i++) {
                list.push(parsedBody.results[i].city);
            }
            cb(list);
        });
    };

    const req = https.request(options, callback);
    req.end();
};


module.exports.getCityParams = function getCityParams(cityname, cb) {


    https.get('https://api.openaq.org//v1/latest?city='+cityname, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });


        resp.on('end', () => {
            let parsedBody = JSON.parse(data);
            cb(parsedBody);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

};

module.exports.getLocationUpdated = function getLocationUpdated(location, cb) {

    https.get('https://api.openaq.org//v1/locations?location='+location, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });


        resp.on('end', () => {
            let parsedBody = JSON.parse(data);
            cb(parsedBody);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

};
