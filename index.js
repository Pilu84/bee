const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require("body-parser");
const { getCities } = require("./connecttoair");


app.use(bodyParser.json());
app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


app.use(express.static("./uploads"));
app.use(express.static("./public"));

app.get("/citiinuk", (req, res) => {
    getCities(function(cities) {

        res.json({cities: cities.results});
    });
});




app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, () => console.log("Its run"));
