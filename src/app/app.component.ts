
import {Component} from '@angular/core';

import {DataCollectionService} from './core/dataCollection.service'



@Component({

  selector: 'inhabit-widget-info',

  templateUrl: './app.component.html',

  providers: [DataCollectionService]

})

export class AppComponent {

  private dataCollector: DataCollectionService;



  public constructor(dataCollSrv:DataCollectionService) {

    this.dataCollector = dataCollSrv;

    this.reloadPage(null);

  }



  public refreshData(event:any){

    if (this.dataCollector) {

      this.dataCollector.refreshData();

    }

  }



  public reloadPage(event:any){

    if (this.dataCollector) {

      this.dataCollector.refreshPage();

    }

  }

}
