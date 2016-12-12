import {NgModule}       from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MessagesExplanator}  from './components/messages.explanator/messages.explanator.component';
import {PresCenterConfigDumper} from './components/prescenter.config.dumper/prescenter.config.dumper.component';
import {SemtanticEntityExplanator} from './components/semantic.entity.explanator/semantic.entity.explanator.component';
import {WidgetExplanator} from './components/widget.explanator/widget.explanator.component';
import {WidgetMessenger} from './components/widget.messenger/widget.messenger.component';
import {WidgetSemanticator} from './components/widget.semanticator/widget.semanticator.component';
import {DataCollectionService} from './core/dataCollection.service';
import { SemanticTaxonomyExplanatorComponent } from './components/semantic-taxonomy-explanator/semantic-taxonomy-explanator.component';

@NgModule({
  declarations: [

    AppComponent,
    MessagesExplanator,
    PresCenterConfigDumper,
    SemtanticEntityExplanator,
    WidgetExplanator,
    WidgetMessenger,
    WidgetSemanticator,
    SemanticTaxonomyExplanatorComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DataCollectionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
