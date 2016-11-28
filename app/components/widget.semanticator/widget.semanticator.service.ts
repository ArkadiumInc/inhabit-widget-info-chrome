import { Injectable } from "angular2/core";
import { SemanticAnalyzeResult } from './data.models/semanticAnalyzeResult.model';
import { SemanticEntity } from './data.models/semanticEntitiy.model';

@Injectable()
export class WidgetSemanticatorService {
    private entities : Array<SemanticAnalyzeResult<SemanticEntity>>;
    private keywords : Array<SemanticAnalyzeResult<string>>;
    private concepts : Array<SemanticAnalyzeResult<string>>;
    private taxonomy : Array<SemanticAnalyzeResult<string>>;

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

    public refreshData() {
        this.resetData();
        var thisService = this;
        return new Promise ((resolve, reject) => {
            chrome.tabs.executeScript(null, {file: "/page_scripts/page_injectables/pageSemanticResultsRetriever.js"},
                function(results) {
                    if (results instanceof Array &&
                        results.length === 1) {
                        resolve(results[0]);
                    }
                    var msg = "Results from page empty";
                    console.error(msg);
                    reject(msg)
                });

             // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
             //     chrome.tabs.sendMessage(tabs[0].id, {requestType: "semanticData"},
             //         function(response){
             //             if (!response) {
             //                 reject("WidgetSemanticatorService : response object from page is undefined");
             //             }
             //             else ;
             //         })
             // });
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
