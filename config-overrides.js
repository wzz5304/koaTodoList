const path = require('path')
const { override, fixBabelImports, addTslintLoader, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('./customize-cra.js')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addTslintLoader(),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    addDecoratorsLegacy(),
    addWebpackAlias({
        ["@src"]: path.resolve(__dirname, "./src"),          
        //["components"]: path.resolve(__dirname, "src/components")    
    })
    //module.exports = override(   ));
);