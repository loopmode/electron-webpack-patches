const before = `
    hasDevDependency(name) {
        return name in this.metadata.devDependencies;
    }
    configure(entry) {`;
const after = `
    hasDevDependency(name) {
        return name in this.metadata.devDependencies;
    }
    /**
     * Returns the names of devDependencies that match a given string or regex.
     * If no matching dependecies are found, an empty array is returned.
     *
     * @param {string|regex} name - The matcher term, e.g. 'babel-preset-'
     * @param {object} options - optional configuration
     * @param {array} options.not - list of matchers to exclude, e.g. {not: ['babel-preset-env']}
     * @return {array} - list of matching dependency names, e.g. ['babel-preset-react', 'babel-preset-stage-0']
     */
    getMatchingDevDependencies(name, options) {
        const excludes = options && options.not || [];
        return Object.keys(this.metadata.devDependencies).reduce((result, key) => {
            const isExclude = excludes.some(excludedKey => name.match(excludedKey));
            const isMatch = key.match(name) && !isExclude;
            if (isMatch) {
                result.push(key);
            }
            return result;
        }, []);
    }
    configure(entry) {`;

module.exports = {
    files: 'node_modules/electron-webpack/out/main.js',
    from: before,
    to: after
};
