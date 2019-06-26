module.exports = {
  entry: './app/index.ts',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          exportOnlyLocals: true,
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  output: {
    path: __dirname + '/dist/app',
    publicPath: '/',
    filename: 'app.js',
    globalObject: 'this'
  }
}