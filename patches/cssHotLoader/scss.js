// ------------------------------ SCSS ------------------------------

const before = `
            use: ExtractTextPlugin.extract({
                use: [{ loader: "css-loader" }, { loader: "sass-loader" }],
                fallback: "style-loader"
            })
`;
const after = `
            use: cssHotLoader.concat(ExtractTextPlugin.extract({
                use: [{ loader: "css-loader" }, { loader: "sass-loader" }],
                fallback: "style-loader"
            }))
`;

module.exports = {
    files: 'node_modules/electron-webpack/out/targets/RendererTarget.js',
    from: before,
    to: after
};
