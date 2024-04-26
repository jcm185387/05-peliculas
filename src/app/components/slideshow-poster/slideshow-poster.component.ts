import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent  implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  constructor(private sanitized: DomSanitizer,
              private modalCtrl: ModalController) { }

  ngOnInit(
    
  ) {
  }

  trustedUrl(unsafeUrl: string){

    return this.sanitized.bypassSecurityTrustUrl(unsafeUrl);
  }

  async VerDetalle(id : number){
    console.log("clicj en  el pares");
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
