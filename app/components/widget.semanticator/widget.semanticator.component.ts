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
        this.refreshData();
    }

    refreshData(){
        if (this.semanticator) {
            this.semanticatorEntities = this.semanticator.getEnitities();
            this.semanticatorTags = this.semanticator.getTags();
            this.semanticatorTaxonomy = this.semanticator.getTaxonomy();
        } else {
            this.semanticatorEntities = [];
            this.semanticatorTags = [];
            this.semanticatorTaxonomy = [];
        }
    }
}
