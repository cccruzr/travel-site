var path = require("path");

module.exports = {
    mode: 'production',
    entry: {
        App: "./travel-app/assets/scripts/App.js",
        Vendor: "./travel-app/assets/scripts/Vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./travel-app/temp/scripts"),
        filename: "[name].js"
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