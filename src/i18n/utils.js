export const globalVars = {
    siteTitle: {
        en: "Information Classification",
        fr: "Classification d'information"
    },    
};

// detects the page languaged based on URL
// from https://docs.astro.build/en/recipes/i18n/
export function getLangFromUrl(url) {
    const defaultLang = "en";
    const [, lang] = url.pathname.split('/');
    if (lang === "en" || lang === "fr") return lang;
    return defaultLang;
}

// Translates a URL to the other language (theLang)
// E.g. if the URL is the english path, it will return the same path but for the french language
export function translateURL(url, theLang) {
    const urlParts = url.pathname.split('/');

    // Replace the second element with the new language code
    if (urlParts.length > 1) {
        urlParts[1] = theLang;
    }

    // Join the array back into a string using '/' as the delimiter
    return urlParts.join('/');
  }