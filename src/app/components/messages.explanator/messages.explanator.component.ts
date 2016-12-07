import {Component, Input} from '@angular/core';
import {ExplanationLine} from '../../data.models/explanationLine.model';

@Component({
    selector: 'inhabit-messages-explanator',
    templateUrl: 'messages.explanator.template.html',
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
            expLine.text += msg.err;
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
            expLine.text += " with error " + msg.err;
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
            expLine.text += " with error " + msg.err;
        }
        expLine.type = ExplanationLine.TYPE_WARNING;
        return expLine;
    }

    private wtf(msg:any) {
        var expLine = new ExplanationLine();
        expLine.text = "Oops, something unexplainable here: " + JSON.stringify(msg);
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
                default:
                    newExpLine = this.wtf(msg);
            }
            tmpExpLines.push(newExpLine);
        }
        this.explanationLines = tmpExpLines;
    };


}
