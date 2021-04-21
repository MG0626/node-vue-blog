module.exports = {
  outputDir: __dirname + '/../service/apps/public/admin',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin'
    : '/'
}