window.addEventListener("load", onPageLoad, false);

function onPageLoad (evt) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('/page_scripts/page_injectables/pageEventHandlers.js');
    (document.head||document.documentElement).appendChild(s);
    // s.onload = function() {
    //     s.parentNode.removeChild(s);
    // };
}
