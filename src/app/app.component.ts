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
    var thisObj = this;
    if (this.dataCollector) {
      this.dataCollector.stateChanges$.subscribe(
        function(msg:any) {
          thisObj.onDataCollected (msg);
        }
      );
    }
    this.reloadPage(null);
  }

  private reReadData(iterationCount) {
    let counter = iterationCount;
    this.dataCollector.refreshData()
      .then(function() {
              this.refreshIntervalId = setTimeout(function () {
              //Going to re-read collected data 20 times.
              // It is necessary because a Factive module could be rejected by timeout.
              //TODO: consider using events presenter.content or presenter.module.empty.list (if no appropriate module found)
              // as signal that re-reading collected data should be stopped but in this case we need to be sure that all
              // existing on the page Factives received one of these messages. So for now I'd rather stick with re-reading
              // collected data %MAX_COUNT% times.
              if (counter < 20) {
                counter += 1;
                this.reReadData(counter);
              } else {
                //Proceed all re-reading iterations, but Inhabit was not found somehow
                if (!this.inhabitFound) {
                  console.log("Finished re-reading data on iteration " + counter);
                  this.notFound = true;
                }
              }
            }.bind(this), 1000);
          }.bind(this))
      .catch(function(err) {
        console.log("Interrupting re-reading data on iteration " + counter + " because "+ err);
        this.notFound = true;
      });
  }

  private refreshPage() {
    clearInterval(this.refreshIntervalId);
    this.notFound = false;
    this.reReadData(0);
  }

  public reloadPage(event: any) {
    if (this.dataCollector) {
      this.dataCollector.refreshPage();
    }
    this.refreshPage();
  }

  private onDataCollected (msg : any) {
    if (msg.startsWith("data.refresh.")){
      this.inhabitFound = this.dataCollector.inhabitAttached;
    }
  }

}
