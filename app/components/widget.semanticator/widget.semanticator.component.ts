import {Component} from 'angular2/core';
import {DataCollectionService} from '../../core/dataCollection.service'

@Component({
    selector: 'inhabit-widget-semanticator',
    templateUrl: '/app/components/widget.semanticator/widget.semanticator.template.html',
    properties: ['semanticatorEntities', 'semanticatorTags', 'semanticatorTaxonomy'],
    providers: [DataCollectionService]
})
export class WidgetSemanticator {
    semanticatorEntities: Array<any>;
    semanticatorTags: Array<string>;
    semanticatorTaxonomy: Array<string>;
    dataCollector: DataCollectionService;

    constructor(private semanticatorService:DataCollectionService) {
        this.dataCollector = semanticatorService;
        this.reloadPage(null);
    }

    refreshData(event){
        if (this.dataCollector) {
            this.dataCollector.refreshData()
                 .then(() => {
                     this.semanticatorEntities = this.dataCollector.getEnitities();
                 });
        } else {
            this.semanticatorEntities = [];
            this.semanticatorTags = [];
            this.semanticatorTaxonomy = [];
        }
    }

    reloadPage(event){
        this.semanticatorEntities = [];
        this.semanticatorTags = [];
        this.semanticatorTaxonomy = [];

        if (this.dataCollector) {
            this.dataCollector.refreshPage();
        }
    }

}
