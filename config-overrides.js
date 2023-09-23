const webpack = require("webpack")

module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
    }
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js", ".mjs"]
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]
    // https://stackoverflow.com/questions/69427025/programmatic-webpack-jest-esm-cant-resolve-module-without-js-file-exten
    config.module.rules = [
        ...config.module.rules,
        {
            test: /\.(m?js)$/,
            include: /node_modules/,
            resolve: {
                fullySpecified: false,
            },
        },
    ]
    return config
}