import {Component, Input} from '@angular/core';
import {ExplanationLine} from '../../data.models/explanationLine.model';

@Component({
    selector: 'inhabit-messages-explanator',
    templateUrl: './messages.explanator.template.html',
})
export class MessagesExplanator {
    public explanationLines : Array<ExplanationLine>;
    public expLineFailure = ExplanationLine.TYPE_FAILURE;
    public expLineSuccess = ExplanationLine.TYPE_SUCCESS;
    public expLineWarning = ExplanationLine.TYPE_WARNING;

    private presenterModuleExpl(msg:any) {
        var expLine = new ExplanationLine();
        if (msg.time) {
            expLine.text += "On " + (new Date(msg.time)).toUTCString();
        }
        if (msg.modId) {
            expLine.text += " getting module " + msg.modId;
        }
        if (msg.modIndx) {
            expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
        }
        expLine.type = ExplanationLine.TYPE_DEFAULT;
        return expLine;
    }

    private presenterContentExpl(msg:any) {
        var expLine = new ExplanationLine();
        if (msg.time) {
            expLine.text += "On " + (new Date(msg.time)).toUTCString();
        }
        if (msg.modId) {
            expLine.text += " for the module " + msg.modId;
        }
        if (msg.modIndx) {
            expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
        }
        expLine.text += " content found.";
        expLine.type = ExplanationLine.TYPE_SUCCESS;
        return expLine;
    }

    private presenterNoContentExpl(msg:any) {
        var expLine = new ExplanationLine();
        if (msg.time) {
            expLine.text += "On " + (new Date(msg.time)).toUTCString();
        }
        if (msg.modId) {
            expLine.text += " for the module " + msg.modId;
        }
        if (msg.modIndx) {
            expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
        }
        expLine.text += " no content found.";
        expLine.type = ExplanationLine.TYPE_WARNING;
        return expLine;
    }

    private presenterErrorExpl(msg:any) {
        var expLine = new ExplanationLine();
        if (msg.time) {
            expLine.text += "On " + (new Date(msg.time)).toUTCString();
        }
        expLine.text += " got error";
        if (msg.err) {
            expLine.text += JSON.stringify(msg.err);
        }
        expLine.type = ExplanationLine.TYPE_WARNING;
        return expLine;
    }

    private presenterModuleGetcontentErrorExpl(msg:any) {
        var expLine = new ExplanationLine();
        if (msg.time) {
            expLine.text += "On " + (new Date(msg.time)).toUTCString();
        }
        expLine.text += " failed to get content";
        if (msg.modId) {
            expLine.text += " for the module " + msg.modId;
        }
        if (msg.modIndx) {
            expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
        }
        if (msg.err) {
            expLine.text += " with error " + JSON.stringify(msg.err);
        }
        expLine.type = ExplanationLine.TYPE_WARNING;
        return expLine;
    }

    private presenterModuleDemandErrorExpl(msg:any) {
        var expLine = new ExplanationLine();
        if (msg.time) {
            expLine.text += "On " + (new Date(msg.time)).toUTCString();
        }
        expLine.text += " failed to demand";
        if (msg.modId) {
            expLine.text += " the module " + msg.modId;
        }
        if (msg.modIndx) {
            expLine.text += " on place " + (msg.modIndx + 1); //in msg module index is 0 based
        }
        if (msg.err) {
            expLine.text += " with error " + JSON.stringify(msg.err);
        }
        expLine.type = ExplanationLine.TYPE_WARNING;
        return expLine;
    }

    private presenterModuleEmptyListExpl(msg:any) {
        var expLine = new ExplanationLine();
        if (msg.time) {
          expLine.text += "On " + (new Date(msg.time)).toUTCString();
        }
        expLine.text += " the modules list in config is empty, nothing to show.";
        expLine.type = ExplanationLine.TYPE_WARNING;
        return expLine;
    }

    private appConfigFetchFailureExpl(msg:any) {
      var expLine = new ExplanationLine();
      if (msg.time) {
        expLine.text += "On " + (new Date(msg.time)).toUTCString();
      }
      expLine.text += " the config fetching process failed";
      if (msg.err) {
        expLine.text += " with error " + JSON.stringify(msg.err);
      }
      expLine.type = ExplanationLine.TYPE_FAILURE;
      return expLine;
    }

    private appConfigFetchSuccessExpl(msg:any) {
      var expLine = new ExplanationLine();
      if (msg.time) {
        expLine.text += "On " + (new Date(msg.time)).toUTCString();
      }
      expLine.text += " the config is fetched successfully.";
      expLine.type = ExplanationLine.TYPE_DEFAULT;
      return expLine;
    }

    private wtf(msg:any) {
        var expLine = new ExplanationLine();
        expLine.text = "Oops, something unexplainable had happened here: " + JSON.stringify(msg);
        expLine.type = ExplanationLine.TYPE_FAILURE;
        return expLine;
    }

    @Input()
    set messages( msgs:  Array<any>){
        var tmpExpLines = new Array<ExplanationLine>();
        for(let msg of msgs) {
            var newExpLine : ExplanationLine;
            switch(msg.evt) {
                case ('presenter.module') :
                    newExpLine = this.presenterModuleExpl(msg);
                break;
                case ('presenter.content') :
                    newExpLine = this.presenterContentExpl(msg);
                break;
                case ('presenter.no.content') :
                    newExpLine = this.presenterNoContentExpl(msg);
                break;
                case ('presenter.error') :
                    newExpLine = this.presenterErrorExpl(msg);
                break;
                case ('presenter.module.getcontent.error') :
                    newExpLine = this.presenterModuleGetcontentErrorExpl(msg);
                break;
                case ('presenter.module.demand.error') :
                    newExpLine = this.presenterModuleDemandErrorExpl(msg);
                break;
                case ('presenter.module.empty.list') :
                  newExpLine = this.presenterModuleEmptyListExpl(msg);
                break;
                case ('app.config.fetch.failure') :
                  newExpLine = this.appConfigFetchFailureExpl(msg);
                break;
                case ('app.config.fetch.success') :
                  newExpLine = this.appConfigFetchSuccessExpl(msg);
                break;
                default:
                    newExpLine = this.wtf(msg);
            }
            if (newExpLine) { //so if there is no need to explain some msg, return null for it
              tmpExpLines.push(newExpLine);
            }
        }
        this.explanationLines = tmpExpLines;
    };


}
