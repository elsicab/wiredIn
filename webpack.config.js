const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./frontend/wiredIn.jsx",
    output: {
        path: path.join(__dirname, "app", "assets", "javascripts"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", ".jsx", "*"],
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env", "@babel/react"],
                    },
                },
            },
        ],
    },
    devtool: "source-map",
};