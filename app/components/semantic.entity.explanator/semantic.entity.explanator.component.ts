import {Component, Input} from 'angular2/core';
import { SemanticAnalyzeResult } from '../../data.models/semanticAnalyzeResult.model';
import { SemanticEntity } from '../../data.models/semanticEntitiy.model';

@Component({
    selector: 'inhabit-semantic-entity-explanator',
    templateUrl: '/app/components/semantic.entity.explanator/semantic.entity.explanator.template.html',
    properties: ['entityData']
})
export class SemtanticEntityExplanator {
    public entityData : any;
    @Input()
    set semanticEntityData( data:  SemanticAnalyzeResult<SemanticEntity>){
        //collecting propeties to local value first
        // to avoid firing onChange event for the elements bound to entityData for every item added
        var resValue = {};
        for(var dataItem of data.results) {
            resValue[dataItem.kind] = JSON.parse(dataItem.value);
        }
        this.entityData = resValue;
    };
}
