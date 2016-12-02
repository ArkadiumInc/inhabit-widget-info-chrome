import {Component} from 'angular2/core';

import {DataCollectionService} from '../../core/dataCollection.service'

@Component({
    selector: 'inhabit-widget-messenger',
    templateUrl: '/app/components/widget.messenger/widget.messenger.template.html',
    properties: ['messages']
})
export class WidgetMessenger {
    public messages: Array<any>;
    public contentExists : boolean;
    public contentShown : boolean;
    public contentLoading: boolean;

    private dataCollector: DataCollectionService;
    private onDataCollected (msg) {
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
        if (this.dataCollector) {
            this.dataCollector.stateChanges$.subscribe(
                msg => {
                    this.onDataCollected (msg);
                });
        }
    }


    public toggleExpanding($event) {
        this.contentShown = ! this.contentShown;
    }


    public getProperties(message) {
        return Object.keys(message);
    }

}
