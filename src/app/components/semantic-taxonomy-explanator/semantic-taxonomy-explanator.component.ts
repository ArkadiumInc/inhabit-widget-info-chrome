import {Component, OnInit, Output, Input} from '@angular/core';
import {SemanticAnalyzeResult} from '../../data.models/semanticAnalyzeResult.model';

@Component({
  selector: 'app-semantic-taxonomy-explanator,[app-semantic-taxonomy-explanator]',
  templateUrl: './semantic-taxonomy-explanator.component.html',
  styleUrls: ['./semantic-taxonomy-explanator.component.css']
})
export class SemanticTaxonomyExplanatorComponent implements OnInit {

  @Output() taxonomyData: any;

  constructor() {
  }

  ngOnInit() {
  }

  @Input()
  set semanticTaxonomyData(data: SemanticAnalyzeResult<string>) {
    let resValue: any = {};
    for (let dataItem of data.results) {
      resValue[dataItem] = JSON.parse(dataItem);
    }
    this.taxonomyData = resValue;
  }
}
