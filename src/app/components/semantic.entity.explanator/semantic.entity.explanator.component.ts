import {Component, Input, Output} from '@angular/core';
import { SemanticAnalyzeResult } from '../../data.models/semanticAnalyzeResult.model';
import { SemanticEntity } from '../../data.models/semanticEntitiy.model';

@Component({
    selector: 'inhabit-semantic-entity-explanator',
    templateUrl: './semantic.entity.explanator.template.html',
})
export class SemtanticEntityExplanator {
    @Output() entityData : any;
    @Input()
    set semanticEntityData( data:  SemanticAnalyzeResult<SemanticEntity>){
        //collecting propeties to local value first
        // to avoid firing onChange event for the elements bound to entityData for every item added
        var resValue:any = {};
        for(var dataItem of data.results) {
            resValue[dataItem.kind] = JSON.parse(dataItem.value);
        }
        this.entityData = resValue;
    };
}
