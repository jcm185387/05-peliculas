import { Component, Sanitizer } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DomSanitizer } from '@angular/platform-browser';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar= '';
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avengers','El señor de los anillos','La vida es bella'];
  buscando: boolean = false;
  constructor(private movieService: MoviesService,
              private sanitized: DomSanitizer,
              private modalCtrl: ModalController
  ) {}
  
  buscar(event? : any, idea? : string ){
    this.buscando = true;
    this.textoBuscar = event == undefined ?  idea : event.detail.value;

    if(this.textoBuscar.length === 0){
      this.buscando = false;
      this.peliculas = []
      return;
    }
    this.movieService.BuscarPeliculasxTexto(this.textoBuscar)
    .subscribe(resp => {
      console.log(resp);
      this.buscando = false;
      this.peliculas = resp.results;
    }
      
    )
    ;
  }

  
  myidea(myideaP: string){    
    //this.textoBuscar  = myideaP;
    //const idea = myidea;
    this.buscar(undefined,myideaP);
  
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
