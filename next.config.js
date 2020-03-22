// module.exports = {
//   webpack: (config) => {
//     config.node = {
//       fs: 'empty'
//     }
//     return config
//   }
// };

const withCSS = require('@zeit/next-css')
const withSass = require("@zeit/next-sass");
const withImages = require('next-images');

require("dotenv").config();

module.exports =  withCSS(withImages(withSass({
  // cssModules: true,
  // cssLoaderOptions: {
  //   importLoaders: 1,
  //   localIdentName: "[local]___[hash:base64:5]",
  //   includePaths: ["./view/", "./components/"]
  // },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty"
      };
    }
    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
})));



