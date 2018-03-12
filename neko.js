const neko = require("neko.js");

let nekoclient = new neko.Client(); // default api key is defaulted :D
    // ES6 promises examples.

    nekoclient.hug().then((hug) => console.log(hug.url)); // logs to console the url for hug gif

    nekoclient.pat().then((pat) => console.log(pat.url)); // logs to console the url for pat gif

    nekoclient.kiss().then((kiss) => console.log(kiss.url)); // logs to console the url for kiss gif

    nekoclient.neko().then((neko) => console.log(neko.neko)); // logs to console the url for a Neko picture

    nekoclient.LewdNeko().then((LewdNeko) => console.log(LewdNeko.neko)); // logs to console a LewdNeko image url

    nekoclient.lizard().then((lizard) => console.log(lizard.url)); // logs to console a lizard image url
    // The end.
