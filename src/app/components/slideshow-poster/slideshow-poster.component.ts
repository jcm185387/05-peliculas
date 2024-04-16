import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent  implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  constructor(private sanitized: DomSanitizer) { }

  ngOnInit(
    
  ) {
  }

  trustedUrl(unsafeUrl: string){

    return this.sanitized.bypassSecurityTrustUrl(unsafeUrl);
  }

}
