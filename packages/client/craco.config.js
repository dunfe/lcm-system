const CracoAntDesignPlugin = require('craco-antd')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    webpack: {
        plugins: [
            new MonacoWebpackPlugin(),
            new MiniCssExtractPlugin({
                ignoreOrder: true,
            }),
        ],
    },
    plugins: [{ plugin: CracoAntDesignPlugin }],
}
