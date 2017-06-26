import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader-card/loader-card.component'
import { ImageViewer } from './components/image-viewer/image_viewer.component';
import { ConstantsService } from './services/constants.services'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScraperService } from './services/scaper.service'
import { LoaderService } from './services/loader.service'
@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    ImageViewer,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [ConstantsService, ScraperService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
