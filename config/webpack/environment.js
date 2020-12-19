const { environment } = require('@rails/webpacker')
const typescript =  require('./loaders/typescript')

environment.loaders.prepend('typescript', typescript)
module.exports = environment

const nodeModulesLoader = environment.loaders.get('nodeModules')

if (!Array.isArray(nodeModulesLoader.exclude)) {
    nodeModulesLoader.exclude = (nodeModulesLoader.exclude == null) ? [] : [nodeModulesLoader.exclude]
}
nodeModulesLoader.exclude.push(/react-table/)