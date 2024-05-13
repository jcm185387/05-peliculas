import { Injectable } from '@angular/core';
import { favoritos, Genre,  PeliculaDetalle } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { MoviesService } from './movies.service';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  private _storage: Storage | null = null;
  private peliculas: PeliculaDetalle[] = [];
  private _StoragepelisxGenero: Storage | null = null;

  private _localpelisxgenero: favoritos[] = [];


  generos: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(private storage: Storage,
                      private toastCtrl: ToastController,
                      private movieService: MoviesService) {

    this.init();
   }

   get getLocalPelisxGenero(){
    //console.log("desde el datta", this._localpelisxgenero);
    return [...this._localpelisxgenero];
   }

 

   async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this._StoragepelisxGenero = storage;
    this.loadPelisxGenero();
  }

    // Create and expose methods that users of this service can
  // call, for example:
  async guardarPelicula(pelicula: PeliculaDetalle) {

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
    //this.generos = await this.movieService.cargarGeneros();

    //this.peliculas = await this.loadFavorites();
    this.generos = await this.movieService.cargarGeneros();
    console.log("loadfavoritos", this.peliculas);
    console.log("generos", this.generos);

    //creando los favoritos
    const getFavs = this.pelisPorGenero(this.generos, this.peliculas) || [];
    console.log("favs", getFavs);
    await this._StoragepelisxGenero?.set( 'favoritos', getFavs);  


    //this._localpelisxgenero = this.pelisPorGenero(this.generos, this.peliculas) || [];
    await this.loadPelisxGenero();

   
  }

  async loadPelisxGenero(){
    try{
      const  pelis = await this._StoragepelisxGenero?.get('favoritos');
      this._localpelisxgenero = pelis || [];
    }catch( error ) {
      this._localpelisxgenero = [];
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async loadFavorites(){
    const peliculas = await this.storage.get('peliculas')|| [];
    
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number){
    await  this.loadFavorites();
    const existe = this.peliculas.find( peli => peli.id === id);
   
    return (existe) ? true : false;
  }

  
  async getPelisxGenero (){
    this.peliculas = await this.loadFavorites();
    this.generos = await this.movieService.cargarGeneros();

    this._localpelisxgenero = this.pelisPorGenero(this.generos, this.peliculas) || [];

    return this._localpelisxgenero;
  }

  pelisPorGenero (generos: Genre[], peliculas: PeliculaDetalle[]){
    this.favoritoGenero = [];

    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id);
        })
      });
    });
    return this.favoritoGenero;
  }
  
}
