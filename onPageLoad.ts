window.addEventListener("load", onPageLoad, false);

function onPageLoad (evt) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('pageInjectable.js');
    (document.head||document.documentElement).appendChild(s);
    s.onload = function() {
        s.parentNode.removeChild(s);
    };
    console.log("CHROME ADDIN: on page load (with added document event listeners)");
}
