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
        this.reloadPage(null);
    }

    refreshData(event){
        if (this.semanticator) {
            this.semanticator.refreshData()
                 .then(() => {
                     this.semanticatorEntities = this.semanticator.getEnitities();
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

        if (this.semanticator) {
            this.semanticator.refreshPage();
        }
    }

}
