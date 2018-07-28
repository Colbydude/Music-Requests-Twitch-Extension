let mix = require('laravel-mix');
let tailwindcss = require('tailwindcss');

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

 mix.setPublicPath('public')
    .setResourceRoot('../')
    .js('resources/assets/js/app.js', 'js')
    .sass('resources/assets/sass/app.scss', 'css')
    .options({
        postCss: [ tailwindcss('./tailwind.js') ],
        processCssUrls: false,
        uglify: false
    })
    .extract([
        'axios', 'vue', 'vue-router', 'vue-typeahead', 'vuex'
    ]);
