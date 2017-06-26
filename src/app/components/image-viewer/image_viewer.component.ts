import { Component, Input } from '@angular/core';
import { ScraperService } from '../../services/scaper.service'
import { LoaderService } from '../../services/loader.service'
import { NotificationsService } from 'angular2-notifications';
import { ConstantsService } from '../../services/constants.services'
@Component({
  selector: 'image-viewer',
  templateUrl: './image_viewer.component.html',
  styleUrls: ['./image_viewer.component.css']
})
export class ImageViewer {
  @Input() user_info: Object = null;
  @Input('media-height') mediaHeight: any;
  private query_sent: Boolean = false;
  _notificationsService: NotificationsService;
  constructor(private _service: NotificationsService, public scraperService: ScraperService, public loaderService: LoaderService, public constantsService: ConstantsService) {
    this._notificationsService = _service;
  }
  public getViewUrl(image_obj, type) {
    switch (type) {
      case 'display': {
        if (image_obj['display_src'] !== null && image_obj['display_src'] !== undefined) {
          return image_obj['display_src'];
        } else if (image_obj['node']['display_url'] !== null && image_obj['node']['display_url'] !== undefined) {
          return image_obj['node']['display_url'];
        }
      } break;
      case 'likes': {
        if (image_obj['likes'] !== null && image_obj['likes'] !== undefined) {
          return image_obj['likes']['count'];
        } else if (image_obj['node']['edge_liked_by'] !== null && image_obj['node']['edge_liked_by'] !== undefined) {
          return image_obj['node']['edge_liked_by']['count'];
        }
      } break;
      case 'comment': {
        if (image_obj['comments'] !== null && image_obj['comments'] !== undefined) {
          return image_obj['comments']['count'];
        } else if (image_obj['node']['edge_media_to_comment'] !== null && image_obj['node']['edge_media_to_comment'] !== undefined) {
          return image_obj['node']['edge_media_to_comment']['count'];
        }
      } break;
      case 'caption': {
        if (image_obj['caption'] !== null && image_obj['caption'] !== undefined) {
          return image_obj['caption'];
        } else if (image_obj['node']['edge_media_to_caption'] !== null && image_obj['node']['edge_media_to_caption'] !== undefined) {
          return image_obj['node']['edge_media_to_caption']['edges'][0]['node']['text'];
        }
      } break;
      case 'is_video': {
        if (image_obj['is_video'] !== null && image_obj['is_video'] !== undefined) {
          return image_obj['is_video'];
        } else if (image_obj['node']['is_video'] !== null && image_obj['node']['is_video'] !== undefined) {
          return image_obj['node']['is_video'];
        }
      } break;
    }
  }
  onScroll(evt) {
    var nowWidth = evt.target.scrollWidth - Math.round(evt.target.scrollLeft),
      self = this;
    if ((nowWidth - evt.target.clientWidth) <= 10) {
      if (self.user_info['query_urls'] !== null && self.user_info['query_urls'] !== undefined && self.user_info['query_urls'].length > 0 && !self.query_sent) {
        self.loaderService.showLoader();
        self.query_sent = true;
        self.scraperService.getQueryUrlData({ 'query_urls': self.user_info['query_urls'] }).subscribe(function (response) {
          if (response['data'] !== null && response['data'] !== undefined) {
            self.user_info['query_urls'] = response['query_urls']
            if (response['data']['user'] !== null && response['data']['user'] !== undefined) {
              if (response['data']['user']['edge_owner_to_timeline_media'] !== null && response['data']['user']['edge_owner_to_timeline_media'] !== undefined) {
                if (response['data']['user']['edge_owner_to_timeline_media']['edges'] !== null && response['data']['user']['edge_owner_to_timeline_media']['edges'] !== undefined) {
                  self.user_info['media']['nodes'] = self.user_info['media']['nodes'].concat(response['data']['user']['edge_owner_to_timeline_media']['edges'])
                }
              }
            }
            self.query_sent = false;
          }
          self.loaderService.hideLoader();
        }, function (err) {
          console.log(err);
          //self.query_sent = false;
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
        });
      }
    }
  }
}