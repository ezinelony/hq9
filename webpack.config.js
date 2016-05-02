var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src');
var APP_DIR = path.resolve(__dirname, 'src/app');


var config = {
    resolve: {
        //define where the code resides
        root: APP_DIR,
        extensions: ['', '.js', '.jsx'],
        //we can now include code without complex paths
        modulesDirectories: ['node_modules', APP_DIR]
    },
entry: APP_DIR + '/routes.js',
    output: {
        path: BUILD_DIR+'/../public/javascripts',
        filename: 'react-bundle.js'
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader: 'babel-loader'
            }
        ]
    }
};
module.exports = config;