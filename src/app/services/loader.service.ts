import { Subject } from 'rxjs/Subject';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ConstantsService } from './constants.services'
import { Observable } from 'rxjs/Rx';
@Injectable()
export class LoaderService {
    displayLoader: Boolean = false;
    public showLoader(): void{
        this.displayLoader = true;
    }
    public hideLoader(): void{
        var self = this;
        setTimeout(function(){
            self.displayLoader = false;
        }, 200);
    }
    public getLoaderStatus(): Boolean{
        return this.displayLoader;
    }
}