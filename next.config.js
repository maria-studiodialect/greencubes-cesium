const webpack = require("webpack")

module.exports = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: '/unity/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
          },
        ],
      },
    ]
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("cesium"),
      })
    )
    return config
  },
}
