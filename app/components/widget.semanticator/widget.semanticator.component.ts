import {Component} from 'angular2/core';
import {DataCollectionService} from '../../core/dataCollection.service'
import { SemanticAnalyzeResult } from '../../data.models/semanticAnalyzeResult.model';
import { SemanticEntity } from '../../data.models/semanticEntitiy.model';


@Component({
    selector: 'inhabit-widget-semanticator',
    templateUrl: '/app/components/widget.semanticator/widget.semanticator.template.html',
    properties: ['semanticatorEntities', 'semanticatorTags', 'semanticatorTaxonomy', 'contextUrl',
                 'contentShown', 'contentExists', 'contentLoading' ]
})

export class WidgetSemanticator {
    public semanticatorEntities: Array<SemanticAnalyzeResult<SemanticEntity>>;
    public semanticatorKeywords: Array<SemanticAnalyzeResult<string>>;
    public semanticatorTaxonomy: Array<string>;
    public contextUrl: string;
    public contentExists : boolean;
    public contentShown : boolean;
    public contentLoading: boolean;
    private dataCollector: DataCollectionService;

    public constructor(dataCollSrv:DataCollectionService) {
        this.dataCollector = dataCollSrv;
        if (this.dataCollector) {
            this.dataCollector.stateChanges$.subscribe(
                msg => {
                    this.onDataCollected (msg);
                });
        }
    }

    private onDataCollected (msg) {
        if (msg.startsWith("data.refresh.")){
            this.contentLoading = false;
            this.semanticatorEntities = this.dataCollector.getEnitities();
            this.semanticatorKeywords = this.dataCollector.getKeywords();
            this.contextUrl = this.dataCollector.getContextUrl();
        }
        if (msg == "data.loading") {
            this.contentLoading = true;
        }
    }

    public toggleExpanding($event) {
        this.contentShown = ! this.contentShown;
    }
}
