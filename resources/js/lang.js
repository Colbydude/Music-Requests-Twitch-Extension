const supportedLangs = [
    'en'
];

// Build out the messages from files
// in the /resources/lang directory.
let messages = {};

supportedLangs.forEach(lang => {
    messages[lang] = require(`./../lang/${lang}.json`);
});

// Add to vue-i18n.
export const lang = messages;
