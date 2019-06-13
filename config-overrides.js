const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const path = require("path");
const options = {
    stylesDir: path.join(__dirname, './src/less'),
    antDir: path.join(__dirname, './node_modules/antd'),
    varFile: path.join(__dirname, './src/less/vars.less'),
    mainLessFile: path.join(__dirname, './src/less/main.less'),
    themeVariables: [
        '@primary-color',
        '@secondary-color',
        '@text-color',
        '@text-color-secondary',
        '@heading-color',
        '@layout-body-background',
        '@btn-primary-bg',
        '@layout-header-background',
        '@border-color-base'
    ],
    indexFileName: 'index.html',
    generateOnce: false // generate color.less on each compilation
}

const themePlugin = new AntDesignThemePlugin(options);
const addMyPlugin = config => {
    config.plugins.push(themePlugin)
    return config
}
module.exports = override(
    addMyPlugin,
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#19BE6B' },
        localIdentName: '[local]___[hash:base64:5]'
    }),
);
