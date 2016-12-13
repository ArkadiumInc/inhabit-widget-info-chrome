import {Component, OnInit, Output, Input} from '@angular/core';
import {SemanticAnalyzeResult} from '../../data.models/semanticAnalyzeResult.model';
import {SemanticEntity} from '../../data.models/semanticEntitiy.model';

@Component({
  selector: 'app-semantic-taxonomy-explanator,[app-semantic-taxonomy-explanator]',
  templateUrl: './semantic-taxonomy-explanator.component.html',
  styleUrls: ['./semantic-taxonomy-explanator.component.css']
})
export class SemanticTaxonomyExplanatorComponent {
  @Output() taxonomyData: any;

  @Input()
  set semanticTaxonomyData(data: SemanticAnalyzeResult<SemanticEntity>) {
    this.taxonomyData = {};
    for (let item of data.results) {
      this.taxonomyData[item.kind] = JSON.parse(item.value);
    }
  }
}
