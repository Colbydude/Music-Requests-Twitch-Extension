const mix = require('laravel-mix');
const path = require('path');
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
    .js('resources/js/config.js', 'js')
    .js('resources/js/mobile.js', 'js')
    .js('resources/js/panel.js', 'js')
    .js('resources/js/video_component.js', 'js')
    .vue()
    .sass('resources/sass/app.scss', 'css')
    .copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/fonts/vendor/fontawesome')
    .options({
        postCss: [ tailwindcss('./tailwind.config.js') ],
        processCssUrls: false,
        uglify: false
    })
    .alias({
        '@': path.join(__dirname, 'resources/js')
    })
    .extract([
        'axios', 'lodash', 'vue', 'vue-notification', 'vue-typeahead', 'vue-i18n'
    ]);
