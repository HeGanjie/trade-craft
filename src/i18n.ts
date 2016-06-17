import * as i18next from 'i18next';

let XHR = require('i18next-xhr-backend');
let LanguageDetector = require('i18next-browser-languagedetector');

const inited = i18next
    .use(XHR)
    .use(LanguageDetector)
    .init({
        "debug": false,
        "load": "currentOnly",
        "fallbackLng": "en",
        "backend": {
            "allowMultiLoading": false,
            "crossDomain": false
        }
    });

export default inited;