// ------------------------------ CSS ------------------------------

const before = `
            use: ExtractTextPlugin.extract({
                use: "css-loader",
                fallback: "style-loader"
            })
`;
const after = `
            use: cssHotLoader.concat(ExtractTextPlugin.extract({
                use: "css-loader",
                fallback: "style-loader"
            }))
`;

module.exports = {
    files: 'node_modules/electron-webpack/out/targets/RendererTarget.js',
    from: before,
    to: after
};
