import {Component} from 'angular2/core';
import {DataCollectionService} from '../../core/dataCollection.service'
import { SemanticAnalyzeResult } from '../../data.models/semanticAnalyzeResult.model';
import { SemanticEntity } from '../../data.models/semanticEntitiy.model';

@Component({
    selector: 'inhabit-widget-explanator',
    templateUrl: '/app/components/widget.explanator/widget.explanator.template.html',
    properties: ['explanatorSemanticEntitiy', 'explanatorMessages', 'explanator']
})
export class WidgetExplanator {
    public explanatorSemanticEntitiy: SemanticAnalyzeResult<SemanticEntity>;
    public explanatorMessages: Array<any>;
    public explanatorContextURL: string;

    public constructor(dataCollSrv:DataCollectionService) {
        this.dataCollector = dataCollSrv;
        if (this.dataCollector) {
            this.dataCollector.stateChanges$.subscribe(
                msg => {
                    this.onDataCollected (msg);
                });
        }
    }

    private dataCollector: DataCollectionService;
    private onDataCollected (msg) {
        if (msg.startsWith("data.refresh.")){
            var entities = this.dataCollector.getEnitities();
            if ( entities instanceof Array  &&
                entities.length > 0) {
                this.explanatorSemanticEntitiy = entities[0];
            } else {
                this.explanatorSemanticEntitiy = null;
            }
            this.explanatorMessages = this.dataCollector.getMessages();
            this.explanatorMessages = this.dataCollector.getMessages();
        }
    }
}
