import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent  implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() CargarMas = new EventEmitter();
  constructor(private sanitized: DomSanitizer,
              private modalCtrl: ModalController) { }

  ngOnInit() {}

  trustedUrl(unsafeUrl: string){
    return this.sanitized.bypassSecurityTrustUrl(unsafeUrl);
  }

  onClick(){
    this.CargarMas.emit();
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
