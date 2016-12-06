import {Component} from 'angular2/core';

import {DataCollectionService} from '../../core/dataCollection.service'

import {SemtanticEntityExplanator} from '../semantic.entity.explanator/semantic.entity.explanator.component';
import {MessagesExplanator} from '../messages.explanator/messages.explanator.component';

import { SemanticAnalyzeResult } from '../../data.models/semanticAnalyzeResult.model';
import { SemanticEntity } from '../../data.models/semanticEntitiy.model';

@Component({
    selector: 'inhabit-widget-explanator',
    templateUrl: '/app/components/widget.explanator/widget.explanator.template.html',
    directives: [SemtanticEntityExplanator, MessagesExplanator],
    properties: ['explanatorSemanticEntitiy', 'explanatorMessages', 'explanatorContextUrl', 'explanatorModules',
                 'contentShown', 'contentExists', 'contentLoading' ]
})
export class WidgetExplanator {
    public explanatorSemanticTopEntities: Array<SemanticAnalyzeResult<SemanticEntity>>;
    public explanatorMessages: Array<any>;
    public explanatorModules: Array<string>;
    public explanatorContextUrl: string;
    public contentExists : boolean;
    public contentShown : boolean;
    public contentLoading: boolean;

    public constructor(dataCollSrv:DataCollectionService) {
        this.dataCollector = dataCollSrv;
        this.contentShown = true;
        var thisObj = this;
        if (this.dataCollector) {
            this.dataCollector.stateChanges$.subscribe(
                function(msg:any){
                    thisObj.onDataCollected (msg);
                });
        }
    }

    private dataCollector: DataCollectionService;
    private fetchModulesFromConfig(config:any) {
        var retVal:any[] = [];
        if (config instanceof Array &&
            config.length > 0) {
            if (config[0].cfg &&
                config[0].cfg.modules &&
                config[0].cfg.modules instanceof Array) {
                    config[0].cfg.modules.map(function(module:any) {
                        retVal.push(module.id);
                    })
            }
        }
        return retVal;
    }
    private onDataCollected (msg:any) {
        if (msg.startsWith("data.refresh.")){
            this.contentLoading = false;
            var entities = this.dataCollector.getEnitities();
            if ( entities instanceof Array  &&
                entities.length > 0) {
                this.explanatorSemanticTopEntities = entities.slice(0, 5);
            } else {
                this.explanatorSemanticTopEntities = [];
            }
            this.explanatorMessages = this.dataCollector.getMessages();
            this.explanatorContextUrl = this.dataCollector.getContextUrl();
            this.explanatorModules = this.fetchModulesFromConfig(this.dataCollector.getPresCenterConfig());
        }
        if (msg == "data.loading") {
            this.contentLoading = true;
        }
    }

    public toggleExpanding($event:any) {
        this.contentShown = ! this.contentShown;
    }

}
