import {Component, Output} from '@angular/core';
import {DataCollectionService} from '../../core/dataCollection.service'

@Component({
    selector: 'inhabit-prescenter-config-dumper',
    templateUrl: './prescenter.config.dumper.template.html',
})
export class PresCenterConfigDumper{
    @Output() rawJson: string;
    @Output() contentExists : boolean;
    @Output() contentShown : boolean;
    @Output() contentLoading: boolean;

    public constructor(dataCollSrv:DataCollectionService) {
        this.dataCollector = dataCollSrv;
        var thisObj = this;
        if (this.dataCollector) {
            this.dataCollector.stateChanges$.subscribe(
                    function(msg:any) {
                        thisObj.onDataCollected (msg);
                    }
            );
        }
    }

    private dataCollector: DataCollectionService;
    private onDataCollected (msg : any) {
        if (msg.startsWith("data.refresh.")){
            this.contentLoading = false;
            this.rawJson = JSON.stringify(this.dataCollector.getPresCenterConfig(), null, 4);
        }
        if (msg == "data.loading") {
            this.contentLoading = true;
        }
    }

    public toggleExpanding($event: any) {
        this.contentShown = ! this.contentShown;
    }
}
