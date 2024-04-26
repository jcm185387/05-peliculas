import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle, RespuestaCredits } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {

  @Input() id: number = 0;
  
  pelicula = {} as PeliculaDetalle;
  //credits = {} as RespuestaCredits;
  actores : Cast[] = [];
  oculto = 150;
  constructor(private moviesService: MoviesService,
    private sanitized: DomSanitizer,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService) { }

  ngOnInit() {
    
    this.moviesService.getPeliculaDetalle(this.id).subscribe(
      resp => {
        console.log(resp);
        this.pelicula = resp;
              
    });
    this.moviesService.getActoresPelicula(this.id).subscribe(
      resp => {
        console.log(resp);
        this.actores = resp.cast;       
    });
  }


  trustedUrl(unsafeUrl: string){
    return this.sanitized.bypassSecurityTrustUrl(unsafeUrl);
  }
  
  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.dataLocal.guardarPelicula(this.pelicula);
    }


}
