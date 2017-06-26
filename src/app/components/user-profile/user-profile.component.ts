import { Component, OnInit, HostListener } from '@angular/core';
import { Log } from 'ng2-logger'
import { NotificationsService } from 'angular2-notifications';
import { ConstantsService } from '../../services/constants.services'
import { ScraperService } from '../../services/scaper.service'
import { LoaderService } from '../../services/loader.service'
import { ImageViewer } from '../image-viewer/image_viewer.component';
@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  logger: any = Log.create('user-profile');
  user_info: Object = null;
  private query_name:String = '';
  _notificationsService: NotificationsService;
  mediaHeight: any;
  public options: any = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  };
  constructor(private _service: NotificationsService, public constantsService: ConstantsService, public scraperService: ScraperService, public loaderService: LoaderService) {
    this._notificationsService = _service;
    this.logger.i("Initializing user profile component.")
  }
  hideLoader(){
    var self = this;
    setTimeout(function(){
      self.loaderService.hideLoader();
    }, 200);
  }
  getUserData(username) {
    var self = this;
    self.scraperService.getUserdata(username).subscribe(function (response) {
      self.setMediaContainerHeight();
      if(response['error']!==null && response['error']!==undefined){
          self._notificationsService.error(
          "Instagram Query Error",
          response['error'],
          {
            timeOut: -1,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true
          }
        )
      }else{
        self.user_info = response;
      }
      self.loaderService.hideLoader();
    }, function (err) {
      console.log(err)
      self.user_info = null;
      self.loaderService.hideLoader();
      this._notificationsService.error(
        this.constantsService.MESSAGES['ERROR']['NETWORK_ERROR_CAPTION'],
        this.constantsService.MESSAGES['ERROR']['NETWORK_ERROR_MSG'],
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true
        }
      )
    })
  }
  validateSearchValue(event) {
    var searchedValue = event.target.value;
    try {
      if (searchedValue !== null && searchedValue !== undefined) {
        searchedValue = searchedValue.trim();
        if (searchedValue.length > 0) {
          if(this.query_name!==searchedValue){
            this.query_name = searchedValue;
            this.loaderService.showLoader();
            this.getUserData(searchedValue);
          }else{
            //Use this block if you want to throw error 
            //to the user for making the same query.
          }
        } else {
          throw new Error(this.constantsService.MESSAGES['ERROR']['INVALID_SEARCH_STRING_CAPTION']);
        }
      } else {
        throw new Error(this.constantsService.MESSAGES['ERROR']['INVALID_SEARCH_STRING_CAPTION']);
      }
    } catch (err) {
      this._notificationsService.error(
        this.constantsService.MESSAGES['ERROR']['INVALID_SEARCH_STRING_CAPTION'],
        this.constantsService.MESSAGES['ERROR']['INVALID_SEARCH_STRING_MSG'],
        {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true
        }
      )
    }
  }
  setMediaContainerHeight() {
    var self = this;
    setTimeout(function () {
      self.mediaHeight = window.innerHeight - document.getElementById("user--container").offsetHeight;
      if (self.mediaHeight < 300) {
        self.mediaHeight = 300;
      }
      self.mediaHeight=self.mediaHeight-20;
    }
    );

  }
  @HostListener('window:resize')
  onWindowResize() {
    this.setMediaContainerHeight();
  }
  keyent(event) {
    this.validateSearchValue(event);
  }
  ngOnInit() {

  }
}