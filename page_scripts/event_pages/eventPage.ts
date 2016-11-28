console.log("Background page: CONNECTED");

chrome.runtime.onMessage.addListener(onInhabitInfoAddinMessage);

function collectSemanticAnalyzeResults(resultsCallback) {
    debugger;
    chrome.tabs.executeScript(null, {file: "/page_scripts/page_injectables/pageSemanticResultsRetriever.js"}, resultsCallback(results));
}


function onInhabitInfoAddinMessage (request, sender, sendResponse) {
    "use strict";
    console.log("Background page: request " + request + " senderResponse " + sendResponse);
    if (request.requestType == "semanticData") {
        var semanticData = collectSemanticAnalyzeResults(sendResponse);
    }
    return true;
}
