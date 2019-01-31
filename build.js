const webpack = require('webpack');

const plugins = [];

module.exports = {
    mode: 'development'
};


if (require.main == module) {
    plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

const conf = {
    entry: [ __dirname + '/src/start.js'],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [['es2015'], ['react']],
                    plugins: [
                        'transform-async-to-generator',
                        'transform-object-rest-spread'
                    ]
                }
            }
        ]
    },
    mode: 'development'
};

if (require.main == module) {
    webpack(conf, function(err, info) {
        if (err) {
            console.log(err);
        }
        if (info && info.compilation.errors.length) {
            console.log(info.compilation.errors);
        }
    });
} else {
    module.exports = require('webpack-dev-middleware')(webpack(conf), {
        watchOptions: {
            aggregateTimeout: 300
        },
        publicPath: '/'
    });
}
