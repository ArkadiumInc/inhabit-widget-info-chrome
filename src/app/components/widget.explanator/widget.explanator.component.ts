import {Component, Output} from '@angular/core';
import {DataCollectionService} from '../../core/dataCollection.service';

import {SemanticAnalyzeResult} from '../../data.models/semanticAnalyzeResult.model';
import {SemanticEntity} from '../../data.models/semanticEntitiy.model';

@Component({
  selector: 'inhabit-widget-explanator',
  templateUrl: './widget.explanator.template.html',
})
export class WidgetExplanator {
  @Output() explanatorSemanticTopEntities: Array<SemanticAnalyzeResult<SemanticEntity>>;
  @Output() explanatorSemtanticTopTaxonomy: Array<SemanticAnalyzeResult<string>>;
  @Output() explanatorMessages: Array<any>;
  @Output() explanatorModules: Array<string>;
  @Output() explanatorContextUrl: string;
  @Output() contentShown: boolean;
  @Output() contentExists: boolean;
  @Output() contentLoading: boolean;

  private dataCollector: DataCollectionService;

  public constructor(dataCollSrv: DataCollectionService) {
    this.dataCollector = dataCollSrv;
    this.contentShown = true;
    let thisObj = this;
    if (this.dataCollector) {
      this.dataCollector.stateChanges$.subscribe(
        function (msg: any) {
          thisObj.onDataCollected(msg);
        });
    }
  }

  private fetchModulesFromConfig(config: any) {
    let retVal: any[] = [];
    if (config instanceof Array &&
      config.length > 0) {
      if (config[0].cfg &&
        config[0].cfg.modules &&
        config[0].cfg.modules instanceof Array) {
        config[0].cfg.modules.map(function (module: any) {
          retVal.push(module.id);
        });
      }
    }
    return retVal;
  }

  private onDataCollected(msg: any) {
    if (msg.startsWith('data.refresh.')) {
      this.contentLoading = false;
      this.parseEntities();
      this.parseTaxonomy();
      this.explanatorMessages = this.dataCollector.getMessages();
      this.explanatorContextUrl = this.dataCollector.getContextUrl();
      this.explanatorModules = this.fetchModulesFromConfig(this.dataCollector.getPresCenterConfig());
    }
    if (msg === 'data.loading') {
      this.contentLoading = true;
    }
  }

  private parseTaxonomy() {
    let taxonomies = this.dataCollector.getTaxonomy();
    if (taxonomies instanceof Array &&
      taxonomies.length > 0) {
      this.explanatorSemtanticTopTaxonomy = taxonomies.slice(0, 5);
    } else {
      this.explanatorSemtanticTopTaxonomy = [];
    }
  }

  private parseEntities() {
    let entities = this.dataCollector.getEnitities();
    if (entities instanceof Array &&
      entities.length > 0) {
      this.explanatorSemanticTopEntities = entities.slice(0, 5);
    } else {
      this.explanatorSemanticTopEntities = [];
    }
  }

  public toggleExpanding($event: any) {
    this.contentShown = !this.contentShown;
  }

}
