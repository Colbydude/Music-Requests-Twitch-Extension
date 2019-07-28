const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

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
    .js('resources/js/app.js', 'js')
    .sass('resources/sass/app.scss', 'css')
    .copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/fonts/vendor/fontawesome')
    .options({
        postCss: [ tailwindcss('./tailwind.config.js') ],
        processCssUrls: false,
        uglify: false
    })
    .extract([
        'axios', 'vue', 'vue-router', 'vue-typeahead', 'vuex'
    ]);
