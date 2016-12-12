import {Component} from '@angular/core';

import {DataCollectionService} from './core/dataCollection.service';


@Component({

  selector: 'inhabit-widget-info',

  templateUrl: './app.component.html',

  providers: [DataCollectionService]

})

export class AppComponent {

  private dataCollector: DataCollectionService;


  public constructor(dataCollSrv: DataCollectionService) {

    this.dataCollector = dataCollSrv;

    this.reloadPage(null);
    setInterval(this.dataCollector.refreshData.bind(this.dataCollector), 1000);
  }

  public reloadPage(event: any) {

    if (this.dataCollector) {

      this.dataCollector.refreshPage();
    }

  }

}
