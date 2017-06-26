import { Component, Renderer, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { LoaderComponent } from './components/loader-card/loader-card.component'
import { Log } from 'ng2-logger'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  logger: any = Log.create('app-root'); ;
  constructor() {
    this.logger.i('Setting up application component.');
  }
}
