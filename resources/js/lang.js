const supportedLangs = [
    'en', 'es'
];

// Build out the messages from files
// in the /resources/lang directory.
let messages = {};

supportedLangs.forEach(lang => {
    messages[lang] = require(`./../lang/${lang}.json`);
});

// Add to vue-i18n.
module.exports = {
    lang: messages,
    supportedLangs
};
