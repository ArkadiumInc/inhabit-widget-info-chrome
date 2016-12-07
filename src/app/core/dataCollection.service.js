System.register(["angular2/core", "../data.models/semanticAnalyzeResult.model", "../data.models/semanticEntitiy.model", "rxjs/Subject"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, semanticAnalyzeResult_model_1, semanticEntitiy_model_1, Subject_1, DataCollectionService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (semanticAnalyzeResult_model_1_1) {
                semanticAnalyzeResult_model_1 = semanticAnalyzeResult_model_1_1;
            },
            function (semanticEntitiy_model_1_1) {
                semanticEntitiy_model_1 = semanticEntitiy_model_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }
        ],
        execute: function () {
            DataCollectionService = (function () {
                function DataCollectionService() {
                    //Somehow the readonly keyword generates js that is not accepted by Chrome 54
                    this.textClassificationCacheStorageKey = "TextClassificationCache";
                    this.messagesLogStorageKey = "inhabitWidgetInfoMessageLog";
                    this.presCenterConfigVarName = "__inhabitWidgetInfoUntouchedPresCenterConfig__";
                    this.scriptIdCollectResults = "inhabitGetCollectResults";
                    this.scriptSrcCollectResults = "/page_scripts/page_injectables/pageResultsRetriever.js";
                    this.scriptIdEventHandlers = "inhabitEventHandlers";
                    this.scriptSrcEventHandlers = "/page_scripts/page_injectables/pageEventHandlers.js";
                    this.stateChangesSource = new Subject_1.Subject();
                    this.stateChanges$ = this.stateChangesSource.asObservable();
                    this.resetData();
                }
                DataCollectionService.prototype.resetData = function () {
                    this.entities = null;
                    this.keywords = null;
                    this.concepts = null;
                    this.taxonomy = null;
                    this.messages = null;
                    this.contextUrl = null;
                    this.presCenterConf = null;
                };
                DataCollectionService.prototype.processEntities = function (entities) {
                    var thisService = this;
                    if (entities instanceof Array) {
                        thisService.entities = [];
                        entities.map(function (responseEntity) {
                            var entity = new semanticAnalyzeResult_model_1.SemanticAnalyzeResult();
                            entity.providerName = responseEntity.providerName || "";
                            entity.results = [];
                            if (responseEntity.results instanceof Array) {
                                responseEntity.results.map(function (responseResult) {
                                    var result = new semanticEntitiy_model_1.SemanticEntity();
                                    result.kind = responseResult.kind;
                                    result.value = responseResult.value;
                                    entity.results.push(result);
                                });
                            }
                            thisService.entities.push(entity);
                        });
                    }
                };
                DataCollectionService.prototype.processMessages = function (messages) {
                    var thisService = this;
                    if (messages instanceof Array) {
                        thisService.messages = [];
                        messages.map(function (responseMsg) {
                            thisService.messages.push(responseMsg);
                        });
                    }
                };
                DataCollectionService.prototype.processResponseFromPage = function (response) {
                    if (!response) {
                        console.error("response is empty");
                        return;
                    }
                    this.processEntities(response.entities);
                    this.processMessages(response.messages);
                    this.contextUrl = response.contUrl;
                    this.presCenterConf = this.processPressCenterConfig(response.presCntCnf);
                };
                DataCollectionService.prototype.processPressCenterConfig = function (config) {
                    return JSON.parse(config);
                };
                DataCollectionService.prototype.createScriptToHandlePageReload = function () {
                    return "window.__inhabitWidgetInfoMessagesStorageKey = '" + this.messagesLogStorageKey + "';" +
                        "window.__untochedPresCenterConfigVarName__ = '" + this.presCenterConfigVarName + "';" +
                        "window.__ark_app__ = window.__ark_app__ || {onload:[]};" +
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
                        "function() {" +
                        "if (! document.getElementById('" + this.scriptIdCollectResults + "')) {" +
                        "var s = document.createElement('script');" +
                        "s.src = '" + chrome.extension.getURL(this.scriptSrcCollectResults) + "';" +
                        "document.body.insertBefore(s, document.body.firstChild);" +
                        "};" +
                        "});";
                };
                DataCollectionService.prototype.createScriptForCollectingResults = function () {
                    return "if (! document.getElementById('" + this.scriptIdCollectResults + "')) {" +
                        "var s = document.createElement('script');" +
                        "s.src = '" + chrome.extension.getURL(this.scriptSrcCollectResults) + "';" +
                        "document.body.appendChild(s); " +
                        "};" +
                        "interactiveInhabitCollectResults('" + this.textClassificationCacheStorageKey + "','" + this.messagesLogStorageKey + "');";
                };
                ;
                DataCollectionService.prototype.refreshPage = function () {
                    this.resetData();
                    this.stateChangesSource.next("data.loading");
                    var script = this.createScriptToHandlePageReload();
                    var reloadOptions = {
                        injectedScript: script
                    };
                    chrome.devtools.inspectedWindow.reload(reloadOptions);
                };
                DataCollectionService.prototype.refreshData = function () {
                    var _this = this;
                    this.resetData();
                    var thisService = this;
                    return new Promise(function (resolve, reject) {
                        chrome.devtools.inspectedWindow.eval(_this.createScriptForCollectingResults(), function (result, exceptionInfo) {
                            if (exceptionInfo) {
                                console.error(exceptionInfo.value);
                            }
                            resolve(result);
                        });
                    })
                        .then(function (response) {
                        thisService.processResponseFromPage(response);
                        _this.stateChangesSource.next("data.refresh.succeed");
                        return true;
                    })
                        .catch(function (reason) {
                        _this.stateChangesSource.next("data.refresh.failed");
                        console.log(reason);
                    });
                };
                DataCollectionService.prototype.getEnitities = function () {
                    return this.entities;
                };
                DataCollectionService.prototype.getKeywords = function () {
                    return this.keywords;
                };
                DataCollectionService.prototype.getConcepts = function () {
                    return this.concepts;
                };
                DataCollectionService.prototype.getTaxonomy = function () {
                    return this.taxonomy;
                };
                DataCollectionService.prototype.getMessages = function () {
                    return this.messages;
                };
                DataCollectionService.prototype.getContextUrl = function () {
                    return this.contextUrl;
                };
                DataCollectionService.prototype.getPresCenterConfig = function () {
                    return this.presCenterConf;
                };
                return DataCollectionService;
            }());
            DataCollectionService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], DataCollectionService);
            exports_1("DataCollectionService", DataCollectionService);
        }
    };
});
//# sourceMappingURL=dataCollection.service.js.map