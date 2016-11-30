import { Injectable } from "angular2/core";
import { SemanticAnalyzeResult } from '../components/widget.semanticator/data.models/semanticAnalyzeResult.model';
import { SemanticEntity } from '../components/widget.semanticator/data.models/semanticEntitiy.model';

@Injectable()
export class DataCollectionService {
    private entities : Array<SemanticAnalyzeResult<SemanticEntity>>;
    private keywords : Array<SemanticAnalyzeResult<string>>;
    private concepts : Array<SemanticAnalyzeResult<string>>;
    private taxonomy : Array<SemanticAnalyzeResult<string>>;

    //Somehow the readonly keyword generates js that is not accepted by Chrome 54
    private textClassificationCacheStorageKey = "TextClassificationCache";
    private messagesLogStorageKey = "inhabitWidgetInfoMessageLog";

    private scriptIdCollectResults = "inhabitGetCollectResults";
    private scriptSrcCollectResults = "/page_scripts/page_injectables/pageResultsRetriever.js";

    private scriptIdEventHandlers = "inhabitEventHandlers";
    private scriptSrcEventHandlers = "/page_scripts/page_injectables/pageEventHandlers.js";

    private resetData() {
        this.entities = null;
        this.keywords = null;
        this.concepts = null;
        this.taxonomy = null;
    }

    private processResponseFromPage(response) {
        let recievedData = response;
        if (! response) {
            console.error("response is empty");
            return;
        }
        var thisService = this;
        if (recievedData.entities instanceof Array) {
            thisService.entities = [];
            recievedData.entities.map(function(responseEntity) {
                let entity  = new  SemanticAnalyzeResult<SemanticEntity>();
                entity.providerName = responseEntity.providerName || "";
                entity.results = [];
                if (responseEntity.results instanceof Array) {
                    responseEntity.results.map(function(responseResult){
                        let result = new SemanticEntity();
                        result.kind  = responseResult.kind;
                        result.value = responseResult.value;
                        entity.results.push(result);
                    });
                }
                thisService.entities.push(entity)
            });
        }
    }

    public constructor() {
        this.resetData();
    }

    private createScriptToHandlePageReload() {
        return   "window.__inhabitWidgetInfoMessagesStorageKey = '"+this.messagesLogStorageKey+"';"+
                 "window.__ark_app__ = window.__ark_app__ || {onload:[]};"+
                 "window.__ark_app__.onload.push(" +
                        "function(emitter) {" +
                            "if (! document.getElementById('" + this.scriptIdEventHandlers + "')) {" +
                                "var s = document.createElement('script');" +
                                "s.src = '" + chrome.extension.getURL(this.scriptSrcEventHandlers) + "';" +
                                "s.onload = function() {inhabitWidgetInfoAddEventHandlers(emitter);};" +
                                "document.body.insertBefore(s, document.body.firstChild);" +
                            "};" +
                        "}" +
                    ");" +
                "document.addEventListener( 'DOMContentLoaded', " +
                    "function() {"+
                        "if (! document.getElementById('" + this.scriptIdCollectResults + "')) {" +
                            "var s = document.createElement('script');" +
                            "s.src = '" + chrome.extension.getURL(this.scriptSrcCollectResults) + "';" +
                            "document.body.insertBefore(s, document.body.firstChild);" +
                        "};" +
                    "});";
    }

    private createScriptForCollectingResults() {
        return "if (! document.getElementById('"+ this.scriptIdCollectResults +"')) {"+
            "var s = document.createElement('script');" +
            "s.src = '" + chrome.extension.getURL(this.scriptSrcCollectResults)+"';" +
            "document.body.appendChild(s); " +
            "};" +
             "interactiveInhabitCollectResults('"+this.textClassificationCacheStorageKey+"','"+this.messagesLogStorageKey+"');";
    };

    public refreshPage() {
        this.resetData();
        var script = this.createScriptToHandlePageReload();
        chrome.devtools.inspectedWindow.reload({ injectedScript: script });
    }

    public refreshData() {
        this.resetData();
        var thisService = this;
        return new Promise ((resolve, reject) => {
            chrome.devtools.inspectedWindow.eval(
                this.createScriptForCollectingResults(),
                function(result, exceptionInfo) {
                    if (exceptionInfo) {
                        console.error(exceptionInfo.value);
                    }
                    resolve(result);
                });
        })
        .then((response)=> {
            thisService.processResponseFromPage(response);
            return true;
        })
        .catch ((reason) => {
            console.log(reason);
        });
    }

    public getEnitities() {
       return this.entities;
    }

    public getKeywords() {
       return this.keywords;
    }
    
    public getConcepts() {
       return this.concepts;
    }

    public getTaxonomy() {
       return this.taxonomy;
    }

}
