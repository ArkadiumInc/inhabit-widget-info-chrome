import {Component, Output} from '@angular/core';
import {DataCollectionService} from '../../core/dataCollection.service'
import { SemanticAnalyzeResult } from '../../data.models/semanticAnalyzeResult.model';
import { SemanticEntity } from '../../data.models/semanticEntitiy.model';


@Component({
    selector: 'inhabit-widget-semanticator',
    templateUrl: './widget.semanticator.template.html',
})

export class WidgetSemanticator {
    @Output() semanticatorEntities: Array<SemanticAnalyzeResult<SemanticEntity>>;
    @Output() semanticatorKeywords: Array<SemanticAnalyzeResult<string>>;
    @Output() semanticatorTaxonomy: Array<string>;
    @Output() contextUrl: string;
    @Output() contentExists : boolean;
    @Output() contentShown : boolean;
    @Output() contentLoading: boolean;
    private dataCollector: DataCollectionService;

    public constructor(dataCollSrv:DataCollectionService) {
        this.dataCollector = dataCollSrv;
        var thisObj  = this;
        if (this.dataCollector) {
            this.dataCollector.stateChanges$.subscribe(
                function(msg:any){
                    thisObj.onDataCollected (msg);
                });
        }
    }

    private onDataCollected (msg:any) {
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

    public toggleExpanding($event:any) {
        this.contentShown = ! this.contentShown;
    }
}
