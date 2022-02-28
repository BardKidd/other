const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const Timestamp = new Date().getTime();

// const dir = process.env.VUE_APP_DIR;
// let Dir = "";
// if (
//   process.env.VUE_APP_APIPATH ===
//   "http://api.yahome-test.com.tw/DdmcRecruitSystemApi"
// ) {
//   Dir = process.env.VUE_APP_DIR;
// } else if (process.env.VUE_APP_APIPATH === "http://10.2.15.156/sit2/API") {
//   Dir = process.env.VUE_APP_DIR;
// }

let jsFileName =
  process.env.NODE_ENV === "development"
    ? `js/[name].js`
    : `js/[name].${Timestamp}.js`;
let cssFileName =
  process.env.NODE_ENV === "development"
    ? `css/[name].css`
    : `css/[name].${Timestamp}.css`;
module.exports = {
  productionSourceMap: false,
  runtimeCompiler: false,
  filenameHashing: false,
  devServer: {
    port: 8080,
  },
  // outputDir: Dir,

  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
        mixins: "@/mixins",
        commonAPI: "@/commonAPI",
        store: "@/store",
        data: "@/data",
      },
    },
    plugins: [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    output: {
      // 補上 Timestamp 更新版本
      filename: jsFileName,
      chunkFilename: jsFileName,
    },
  },
  css: {
    // 補上 Timestamp 更新版本
    extract: {
      filename: cssFileName,
      chunkFilename: cssFileName,
    },
  },
  publicPath: "./",
};
