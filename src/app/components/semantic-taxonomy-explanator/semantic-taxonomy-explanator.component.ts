import {Component, OnInit, Output, Input} from '@angular/core';
import {SemanticAnalyzeResult} from '../../data.models/semanticAnalyzeResult.model';
import {SemanticEntity} from '../../data.models/semanticEntitiy.model';

@Component({
  selector: 'app-semantic-taxonomy-explanator,[app-semantic-taxonomy-explanator]',
  templateUrl: './semantic-taxonomy-explanator.component.html',
  styleUrls: ['./semantic-taxonomy-explanator.component.css']
})
export class SemanticTaxonomyExplanatorComponent{
  @Output() taxonomyData: SemanticAnalyzeResult<SemanticEntity>;

  @Input()
  set semanticTaxonomyData(data: SemanticAnalyzeResult<SemanticEntity>) {
    this.taxonomyData = data;
  }
}
