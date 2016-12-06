import {Component} from 'angular2/core';
import {WidgetSemanticator} from './widget.semanticator/widget.semanticator.component';
import {WidgetExplanator} from './widget.explanator/widget.explanator.component';
import {WidgetMessenger} from './widget.messenger/widget.messenger.component';
import {PresCenterConfigDumper} from './prescenter.config.dumper/prescenter.config.dumper.component';
import {DataCollectionService} from '../core/dataCollection.service'

@Component({
    selector: 'inhabit-widget-info',
    templateUrl: '/app/components/app.component.template.html',
    directives: [WidgetSemanticator, WidgetExplanator, WidgetMessenger, PresCenterConfigDumper],
    providers: [DataCollectionService]
})

export class AppComponent {
    private dataCollector: DataCollectionService;

    public constructor(dataCollSrv:DataCollectionService) {
        this.dataCollector = dataCollSrv;
        this.reloadPage(null);
    }

    public refreshData(event:any){
        if (this.dataCollector) {
            this.dataCollector.refreshData();
        }
    }

    public reloadPage(event:any){
        if (this.dataCollector) {
            this.dataCollector.refreshPage();
        }
    }
}

