import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

// register Swiper custom elements
register();



import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent  implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  constructor(private sanitized: DomSanitizer) { }

  ngOnInit() {}

  trustedUrl(unsafeUrl: string){
    return this.sanitized.bypassSecurityTrustUrl(unsafeUrl);
  }

}
