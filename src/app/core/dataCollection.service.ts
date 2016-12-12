import * as Handlebars from 'handlebars';
let pageReloadSnippet = require('raw-loader!./snippets/handlePageReload.js');
let collectableResultsScript = require('raw-loader!./snippets/collectableResultsScript.js');
import {Injectable} from '@angular/core';
import {SemanticAnalyzeResult} from '../data.models/semanticAnalyzeResult.model';
import {SemanticEntity} from '../data.models/semanticEntitiy.model';
import {Subject}    from 'rxjs/Subject';

declare var chrome;

@Injectable()
export class DataCollectionService {
  private stateChangesSource: Subject<string>;

  private entities: Array<SemanticAnalyzeResult<SemanticEntity>>;
  private keywords: Array<SemanticAnalyzeResult<string>>;
  private concepts: Array<SemanticAnalyzeResult<string>>;
  private taxonomy: Array<SemanticAnalyzeResult<string>>;
  private messages: Array<any>;
  private contextUrl: string;
  private presCenterConf: any;

  // Somehow the readonly keyword generates js that is not accepted by Chrome 54
  private textClassificationCacheStorageKey = 'TextClassificationCache';
  private messagesLogStorageKey = 'inhabitWidgetInfoMessageLog';
  private presCenterConfigVarName = '__inhabitWidgetInfoUntouchedPresCenterConfig__';

  private scriptIdCollectResults = 'inhabitGetCollectResults';
  private scriptSrcCollectResults = '/page_scripts/page_injectables/pageResultsRetriever.js';

  private scriptIdEventHandlers = 'inhabitEventHandlers';
  private scriptSrcEventHandlers = '/page_scripts/page_injectables/pageEventHandlers.js';

  public stateChanges$: any;

  private resetData() {
    this.entities = null;
    this.keywords = null;
    this.concepts = null;
    this.taxonomy = null;
    this.messages = null;
    this.contextUrl = null;
    this.presCenterConf = null;
  }

  private processEntities(entities: any[]) {
    let thisService = this;
    if (entities instanceof Array) {
      thisService.entities = [];
      entities.map(function (responseEntity) {
        let entity: SemanticAnalyzeResult<SemanticEntity> = new SemanticAnalyzeResult<SemanticEntity>();
        entity.providerName = responseEntity.providerName || "";
        entity.results = [];
        if (responseEntity.results instanceof Array) {
          responseEntity.results.map(function (responseResult: any) {
            let result: SemanticEntity = new SemanticEntity();
            result.kind = responseResult.kind;
            result.value = responseResult.value;
            entity.results.push(result);
          });
        }
        thisService.entities.push(entity);
      });
    }
  }

  private processMessages(messages: any[]) {
    let thisService = this;
    if (messages instanceof Array) {
      thisService.messages = [];
      messages.map(function (responseMsg: any) {
        thisService.messages.push(responseMsg);
      });
    }
  }

  private processTaxonomies(taxonomies: any) {
    let thisService = this;
    if (taxonomies instanceof Array) {
      thisService.taxonomy = [];
      taxonomies.map(function (responseTaxonomy) {
        let taxonomy: SemanticAnalyzeResult<string> = new SemanticAnalyzeResult<string>();
        taxonomy.providerName = responseTaxonomy.providerName || '';
      });
    }
  }

  private processResponseFromPage(response: any) {
    if (!response) {
      console.error('response is empty');
      return;
    }
    this.processEntities(response.entities);
    this.processMessages(response.messages);
    this.processTaxonomies(response.taxonomy);
    this.contextUrl = response.contUrl;
    this.presCenterConf = this.processPressCenterConfig(response.presCntCnf);
  }

  private processPressCenterConfig(config: any) {
    return JSON.parse(config);
  }

  public constructor() {
    this.stateChangesSource = new Subject<string>();
    this.stateChanges$ = this.stateChangesSource.asObservable();
    this.resetData();
  }

  private createScriptToHandlePageReload(): string {
    if (!chrome.extension) {
      return '';
    }
    let teamplate = Handlebars.compile(pageReloadSnippet);

    return teamplate({
      messagesLogStorageKey: this.messagesLogStorageKey,
      presCenterConfigVarName: this.presCenterConfigVarName,
      scriptIdEventHandlers: this.scriptIdEventHandlers,
      scriptSrcEventHandlers: this.scriptSrcEventHandlers,
      scriptIdCollectResults: this.scriptIdCollectResults,
      scriptSrcCollectResults: this.scriptSrcCollectResults,
      scrptEventSrc: chrome.extension.getURL(this.scriptSrcEventHandlers),
      scriptCollectionSrc: chrome.extension.getURL(this.scriptSrcCollectResults)
    });
  }

  private createScriptForCollectingResults() {
    let template = Handlebars.compile(collectableResultsScript);
    return template({
      scriptIdCollectResults: this.scriptSrcCollectResults,
      scriptSrcCollectResults: chrome.extension.getURL(this.scriptSrcCollectResults),
      textClassificationCacheStorageKey: this.textClassificationCacheStorageKey,
      messagesLogStorageKey: this.messagesLogStorageKey
    });
  };

  public refreshPage() {
    if (!chrome.devtools) {
      return '';
    }
    this.resetData();
    this.stateChangesSource.next('data.loading');
    let script = this.createScriptToHandlePageReload();
    let reloadOptions: any = {
      injectedScript: script
    };
    chrome.devtools.inspectedWindow.reload(reloadOptions);
  }

  public refreshData() {
    this.resetData();
    let thisService = this;
    return new Promise((resolve, reject) => {
      chrome.devtools.inspectedWindow.eval(
        this.createScriptForCollectingResults(),
        function (result, exceptionInfo) {
          if (exceptionInfo) {
            console.error(exceptionInfo.value);
          }
          resolve(result);
        });
    })
      .then((response) => {
        thisService.processResponseFromPage(response);
        this.stateChangesSource.next('data.refresh.succeed');
        return true;
      })
      .catch((reason) => {
        this.stateChangesSource.next('data.refresh.failed');
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

  public getMessages() {
    return this.messages;
  }

  public getContextUrl() {
    return this.contextUrl;
  }

  public getPresCenterConfig() {
    return this.presCenterConf;
  }
}
