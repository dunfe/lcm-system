const CracoAntDesignPlugin = require("craco-antd");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    webpack: {
        devServer: {
            historyApiFallback: true
        },
        plugins: [
            new MonacoWebpackPlugin()
        ],
    },
    plugins: [
        {plugin: CracoAntDesignPlugin},
    ],
};
