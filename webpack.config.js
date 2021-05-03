/* eslint-disable camelcase */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const {
  meta, 
  port,
} = require('./config')

const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: './src/index.pug',
  }),

  new CopyPlugin({
    patterns: [
      {
        from: 'public',
        to: '', 
      },
    ],

    options: {
      concurrency: 100,
    },
  }),

  new VueLoaderPlugin(),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.map$/, /_redirects/],
    }),
    
    new WebpackPwaManifest({
      name: meta.title,
      short_name: meta.title,
      start_url: '/',
      description: meta.description,
      background_color: meta.themeColor,
      crossorigin: 'use-credentials',
      // icons: [
      //   {
      //     src: path.resolve('src/assets/logo.png'),
      //     sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      //   },
      //   {
      //     src: path.resolve('src/assets/large-icon.png'),
      //     size: '1024x1024', // you can also use the specifications pattern
      //   },
      //   {
      //     src: path.resolve('src/assets/maskable-icon.png'),
      //     size: '1024x1024',
      //     purpose: 'maskable',
      //   },
      // ],
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
    }),
  )
}

const sassLoader = [
  'vue-style-loader',
  'css-loader',
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        indentedSyntax: true,
        includePaths: [path.resolve(__dirname, 'src', 'sass')],
      },
    },
  },
]

module.exports = () => ({
  plugins,

  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          {
            use: 'pug-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sass$/,
        use: sassLoader,
      },
      {
        test: /\.(mp4|webm|webp|png|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'vue-svg-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true,
          loaders: { sass: sassLoader },
        },
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'config': path.resolve(__dirname, 'config.js'),
      'css': path.resolve(__dirname, 'src/css'),
      'sass': path.resolve(__dirname, 'src/sass'),
      'assets': path.resolve(__dirname, 'src/assets'),
    },
    extensions: ['.tsx', '.ts', '.js', '.vue'],
  },

  entry: {
    app: './src/index.ts',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },

  devtool: 'source-map',

  devServer: {
    port: port,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
})
