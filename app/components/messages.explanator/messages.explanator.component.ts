import {Component, Input} from 'angular2/core';

@Component({
    selector: 'inhabit-messages-explanator',
    templateUrl: '/app/components/messages.explanator/messages.explanator.template.html',
    properties: ['explanationLines']
})
export class MessagesExplanator {
    public explanationLines : Array<string>;
    @Input()
    set messages( msgs:  Array<any>){

    };
}
