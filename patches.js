#!/usr/bin/env node

// workaround until https://github.com/electron-userland/electron-webpack/pull/28 is merged (or not...)
// adds support for any babel preset or plugin
// adds HMR for CSS/SCSS

const patches = [
    './patches/getMatchingDevDependencies',
    './patches/createBabelLoader',
    './patches/cssHotLoader/common',
    './patches/cssHotLoader/css',
    './patches/cssHotLoader/less',
    './patches/cssHotLoader/scss'
];

const replace = require('replace-in-file');
patches.forEach(applyPatch);

function applyPatch(name) {
    const patch = require(name);
    if (Array.isArray(patch)) {
        patch.forEach(applyPatch);
        return;
    }
    try {
        const changes = replace.sync(patch);
        console.log(`[patches] ${name}`, changes && changes.length ? { changes } : '(unchanged)');
    } catch (error) {
        console.log('┎──────────────────────────────────────────────────────────────────');
        console.log('┃');
        console.log(`┃ Failed to patch ${patch.files}`);
        console.log('┃');
        console.log('┖──────────────────────────────────────────────────────────────────');
        console.log(error);
    }
}
