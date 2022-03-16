const path = require("path");

module.exports = function(_env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        devtool: isDevelopment && "cheap-module-source-map",
        entry: "./src/main.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.js",
            publicPath: "/"
        },
        module: {
            rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader", 
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: isProduction ? "production" : "development"
                    }
                }
            }
            ]
        },
        resolve: {
            extensions: [".js", ".jsx"]
        }
    };
};