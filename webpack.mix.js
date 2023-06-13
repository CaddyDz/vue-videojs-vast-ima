const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
  module: {
    rules: [
      {
        test: /videojs.ima.js$/,
        use: [
          {
            loader: 'imports-loader',
            options: {
              define: ">false",
              exports: ">false",
              holder: ">{name:null, init:null}",
              this: ">{videojs:{registerPlugin:(name,init) => {holder.name = name; holder.init = init;}}}",
            }
          },
          {loader: 'exports-loader', options: "holder"},
        ]
      },
    ]
  }
});
mix.js('js/app.js', 'docs/js');
