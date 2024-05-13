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
  existepeli: boolean = false;

  peliculas: PeliculaDetalle[] = [];
  pelisFavs: PeliculaDetalle[] = [];
  constructor(private moviesService: MoviesService,
    private sanitized: DomSanitizer,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
     ) { }

  async ngOnInit() {
    
    const existe = await this.dataLocal.existePelicula(this.id);
    this.existepeli = existe;

    this.moviesService.getPeliculaDetalle(this.id).subscribe(
      resp => {
        this.pelicula = resp;
              
    });
    this.moviesService.getActoresPelicula(this.id).subscribe(
      resp => {
        this.actores = resp.cast;       
    });
  }


  trustedUrl(unsafeUrl: string){
    return this.sanitized.bypassSecurityTrustUrl(unsafeUrl);
  }
  
  regresar(){
    //this.confirm();   
    this.modalCtrl.dismiss();
  }

  /*
  async confirm() {
    this.pelisFavs = await this.dataLocal.getPelisxGenero();
    return this.modalCtrl.dismiss(this.pelisFavs, 'confirm');
  } 
  */
  

  favorito(){
    this.dataLocal.guardarPelicula(this.pelicula);
    this.existepeli = !this.existepeli;
    }


}
