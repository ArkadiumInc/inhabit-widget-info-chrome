window.addEventListener("load", onPageLoad, false);

var entities = [
    {
        providerName: "Test Provider 1",
        results :[
            {kind: "test kind 1.1", result: "test result 1.1"},
            {kind: "test kind 1.2", result: "test result 1.2"}
        ]
    },
    {
        providerName: "Test Provider 2",
        results :[
            {kind: "test kind 2.1", result: "test result 2.1"},
            {kind: "test kind 2.2", result: "test result 2.2"}
        ]
    }
];

function onInhabitInfoAddinMessage1 (request, sender, sendResponse) {
    "use strict";
    if (request.requestType == "semanticData") {
        sendResponse({entities: entities});
    }
    return true;
}


function onPageLoad (evt) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('/page_scripts/pageInjectable.js');
    (document.head||document.documentElement).appendChild(s);
    s.onload = function() {
        chrome.runtime.onMessage.addListener(onInhabitInfoAddinMessage1);
        console.log ("Added listener to the messages in chrome;");
        s.parentNode.removeChild(s);
    };
    console.log("CHROME ADDIN: on page load (with added document event listeners)");
}
