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

  private reReadData(iterationCount) {
    let counter = iterationCount;
    this.dataCollector.refreshData()
      .then(function() {
              this.refreshIntervalId = setTimeout(function () {
              counter += 1;
              //Going to re-read collected data 20 times.
              // It is necessary because a Factive module could be rejected by timeout.
              //TODO: consider using events presenter.content or presenter.module.empty.list (if no appropriate module found)
              // as signal that re-reading collected data should be stopped but in this case we need to be sure that all
              // existing on the page factives recieved one of these messages. So for now I'd rather stick with re-reading
              // collected data %MAX_COUNT% times.
              if (counter >= 20) {
                clearInterval(this.refreshIntervalId);
              } else {
                this.reReadData(counter);
              }
            }.bind(this), 1000);
          }.bind(this))
      .catch( function(err) {
        clearInterval(this.refreshIntervalId);
      });
  }

  private refreshPage() {
    clearInterval(this.refreshIntervalId);
    this.reReadData(0);
  }

  public reloadPage(event: any) {
    if (this.dataCollector) {
      this.dataCollector.refreshPage();
    }
    this.refreshPage();
  }

}
