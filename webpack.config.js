var path = require("path");

module.exports = {
    mode: 'development',
    entry: "./travel-app/assets/scripts/App.js",
    output: {
        path: path.resolve(__dirname, "./travel-app/temp/scripts"),
        filename: "App-compiled.js"
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js&/,
                exclude: /node_modules/
            }
        ]
    }
}