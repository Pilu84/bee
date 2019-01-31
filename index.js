const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require("body-parser");


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

app.use(express.static("./public"));
app.use(express.static("./uploads"));


app.get("/valami", (req, res) => {
    res.json({valami: "world"});
});




app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, () => console.log("Its run"));
