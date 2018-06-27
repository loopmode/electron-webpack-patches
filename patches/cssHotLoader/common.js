// ------------------------------ CSS ------------------------------

const before = `configurator.extensions.push(".css");`;
const after = `configurator.extensions.push(".css");
        const cssHotLoader = configurator.isProduction ? [] : ['css-hot-loader'];`;

module.exports = {
    files: 'node_modules/electron-webpack/out/targets/RendererTarget.js',
    from: before,
    to: after
};
