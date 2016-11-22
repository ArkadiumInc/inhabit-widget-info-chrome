import {Component} from 'angular2/core';
import {WidgetSemanticatorService} from './widget.semanticator.service'

@Component({
    selector: 'inhabit-widget-semanticator',
    templateUrl: '/app/components/widget.semanticator/widget.semanticator.template.html',
    properties: ['semanticatorEntities', 'semanticatorTags', 'semanticatorTaxonomy'],
    providers: [WidgetSemanticatorService]
})
export class WidgetSemanticator {
    semanticatorEntities: Array<any>;
    semanticatorTags: Array<string>;
    semanticatorTaxonomy: Array<string>;
    semanticator: WidgetSemanticatorService;

    constructor(private semanticatorService:WidgetSemanticatorService) {
        this.semanticator = semanticatorService;
        this.refreshData(null);
    }

    refreshData(event){
        if (this.semanticator) {
            this.semanticator.refreshData();
            this.semanticatorEntities = this.semanticator.getEnitities();
        } else {
            this.semanticatorEntities = [];
            this.semanticatorTags = [];
            this.semanticatorTaxonomy = [];
        }
    }
}
