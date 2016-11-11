import {Component} from 'angular2/core';
import {WidgetSemanticator} from './widget.semanticator/widget.semanticator.component';

@Component({
    selector: 'inhabit-widget-info',
    templateUrl: '/app/components/app.component.template.html',
    directives: [WidgetSemanticator]
})

export class AppComponent { }
