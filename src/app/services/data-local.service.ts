import { Injectable } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private _storage: Storage | null = null;
  peliculas: PeliculaDetalle[] = [];
  constructor(private storage: Storage,
                      private toastCtrl: ToastController) {

    this.init();
   }

   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

    // Create and expose methods that users of this service can
  // call, for example:
  public guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje =  '';
    for(const peli of this.peliculas){
      if( peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if( existe ){
      this.peliculas = this.peliculas.filter( peli =>
        peli.id !== pelicula.id
      );
      mensaje = 'Removido de favoritos';
    }else{
      this.peliculas.push( pelicula);
      mensaje = 'Agregado de favoritos';
    }
    this.presentToast('middle', mensaje);
    this._storage?.set('peliculas', this.peliculas);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
