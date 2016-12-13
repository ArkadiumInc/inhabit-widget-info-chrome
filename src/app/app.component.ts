import {Component, AfterViewChecked} from '@angular/core';

import {DataCollectionService} from './core/dataCollection.service';
declare let componentHandler: any;

@Component({

  selector: 'inhabit-widget-info',

  templateUrl: './app.component.html',

  providers: [DataCollectionService]

})

export class AppComponent implements AfterViewChecked {
  ngAfterViewChecked(): void {
    componentHandler.upgradeDom();
  }

  inhabitFound: boolean = false;
  notFound: boolean = false;
  private refreshIntervalId: any;
  private dataCollector: DataCollectionService;


  public constructor(dataCollSrv: DataCollectionService) {

    this.dataCollector = dataCollSrv;
    this.reloadPage(null);
  }

  private refreshPage() {
    clearInterval(this.refreshIntervalId);
    this.notFound = false;
    this.inhabitFound = false;
    this.dataCollector.inhabitAttached = false;

    let counter: number = 0;
    this.refreshIntervalId = setInterval(function () {
      this.dataCollector.refreshData.bind(this.dataCollector)();
      this.inhabitFound = this.dataCollector.inhabitAttached;
      if (this.inhabitFound) {
        clearInterval(this.refreshIntervalId);
        return;
      }
      counter += 1;
      if (counter >= 20) {
        clearInterval(this.refreshIntervalId);
        this.notFound = true;
      }
    }.bind(this), 1000);
  }

  public reloadPage(event: any) {
    if (this.dataCollector) {
      this.dataCollector.refreshPage();
    }
    this.refreshPage();
  }

}
