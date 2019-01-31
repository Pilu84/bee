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
            cb(parsedBody);
        });
    };

    const req = https.request(options, callback);
    req.end();
};
