const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
    chainWebpack:(config)=>{
        config.resolve.alias
        	.set('@',resolve('src'))
    }
}

const webpack = require("webpack");

module.exports = {
 configureWebpack: {

   plugins: [
     new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       "window.jQuery": "jquery",
       Popper: ["popper.js", "default"]
     })
   ]
 }
};
