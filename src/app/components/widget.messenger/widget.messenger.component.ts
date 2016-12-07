import {Component, Output} from '@angular/core';
import {DataCollectionService} from '../../core/dataCollection.service'

@Component({
    selector: 'inhabit-widget-messenger',
    templateUrl: './widget.messenger.template.html',
})
export class WidgetMessenger {
    @Output() messages: Array<any>;
    @Output() contentExists : boolean;
    @Output() contentShown : boolean;
    @Output() contentLoading: boolean;

    private dataCollector: DataCollectionService;
    private onDataCollected (msg:any) {
        if (msg.startsWith("data.refresh.")){
            this.contentLoading = false;
            this.messages = this.dataCollector.getMessages();
        }
        if (msg == "data.loading") {
            this.contentLoading = true;
        }
    }

    public constructor(dataCollSrv:DataCollectionService) {
        this.dataCollector = dataCollSrv;
        var thisObj = this;
        if (this.dataCollector) {
            this.dataCollector.stateChanges$.subscribe(
                function(msg:any){
                    thisObj.onDataCollected (msg);
                });
        }
    }


    public toggleExpanding($event:any) {
        this.contentShown = ! this.contentShown;
    }


    public getProperties(message:any) {
        return Object.keys(message);
    }

}
