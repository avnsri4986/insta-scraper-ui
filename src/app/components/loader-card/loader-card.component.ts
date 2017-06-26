import { Component, OnInit, Renderer, ViewChildren, QueryList, ViewChild, HostListener } from '@angular/core';
import { LoaderService } from '../../services/loader.service'
@Component({
  selector: 'loader-card',
  templateUrl: './loader-card.component.html',
  styleUrls: ['./loader-card.component.css']
})
export class LoaderComponent{
    constructor(public loaderService: LoaderService){

    }
}