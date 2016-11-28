import { Injectable } from "angular2/core";

@Injectable()
export class pageDataLoaderService {
    private promisesStorage:  {};
    private msgSemanticResults = "semanticData";

    private onMessage (request, sender, sendResponse){
        if (!request ||
            !request.requestType) {
            return;
        }
        var existingPromise = this.promisesStorage[request.requestType];
        if (existingPromise){
            existingPromise.resolve(request.data);
            this.promisesStorage[request.requestType] = null;
            sendResponse ( {requestType: request.requestType, data: ""});
        }

        return true;
    };

    private requestData (requestType: string) {
        // var newRequestPromise  = new Promise ((resolve, reject) => {
        //     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        //         chrome.tabs.sendMessage(tabs[0].id, {requestType: requestType},
        //             function (response) {
        //                 if (!response) {
        //                     reject("WidgetSemanticatorService : response object from page is undefined");
        //                 }
        //                 else resolve(response);
        //             })
        //     });
        // });
    }

    public constructor() {
        chrome.runtime.onMessage.addListener(this.onMessage.bind(this));
    }

    public requestSemanticAnalyzeResults() {


    }
}
