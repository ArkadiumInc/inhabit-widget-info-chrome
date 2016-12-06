import {Component} from 'angular2/core';
import {DataCollectionService} from '../../core/dataCollection.service'

@Component({
    selector: 'inhabit-prescenter-config-dumper',
    templateUrl: '/app/components/prescenter.config.dumper/prescenter.config.dumper.template.html',
    properties: ['rawJson',
        'contentShown', 'contentExists', 'contentLoading' ]
})
export class PresCenterConfigDumper{
    public rawJson: string;
    public contentExists : boolean;
    public contentShown : boolean;
    public contentLoading: boolean;

    public constructor(dataCollSrv:DataCollectionService) {
        this.dataCollector = dataCollSrv;
        if (this.dataCollector) {
            this.dataCollector.stateChanges$.subscribe(
                    function(msg:any) {
                        this.onDataCollected (msg);
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
