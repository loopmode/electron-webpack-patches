const before = `function createBabelLoader(configurator) {
    // better to use require instead of just preset sname to avoid babel resolving (in our test we set custom resolver - and only in case of explicit required it works)
    const presets = [[require("babel-preset-env"), {
        modules: false,
        targets: computeBabelEnvTarget(configurator.isRenderer, configurator.electronVersion)
    }]];
    if (configurator.hasDevDependency("babel-preset-react")) {
        presets.push([require("babel-preset-react")]);
    }
    return {
        loader: "babel-loader",
        options: {
            presets,
            plugins: [require("babel-plugin-syntax-dynamic-import")]
        }
    };
}`;
const after = `function createBabelLoader(configurator) {
    // better to use require instead of just preset sname to avoid babel resolving (in our test we set custom resolver - and only in case of explicit required it works)
    const presets = [
    [
        require("babel-preset-env"), {
        modules: false,
        targets: computeBabelEnvTarget(configurator.isRenderer, configurator.electronVersion),
      }],
    ]
    const plugins = [
        require("babel-plugin-syntax-dynamic-import"),
    ]

    const userPresets = configurator.getMatchingDevDependencies('babel-preset-', {not: ['babel-preset-env']});
    userPresets.forEach(preset => {
        const presetModule = require(preset);
        presets.push([presetModule.default || presetModule])
    });

    const userPlugins = configurator.getMatchingDevDependencies('babel-plugin-', {not: ['babel-plugin-syntax-dynamic-import']});
    userPlugins.forEach(plugin => {
        const pluginModule = require(plugin);
        plugins.push([pluginModule.default || pluginModule])
    });

    return {
        loader: "babel-loader",
        options: {
            presets,
            plugins
        }
    };
}`;

module.exports = {
    files: 'node_modules/electron-webpack/out/configurators/js.js',
    from: before,
    to: after
};
