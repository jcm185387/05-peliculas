import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL     = environment.url;
const apikey  = environment.apikey;


@Injectable({
  providedIn: 'root'
})



export class MoviesService {

  constructor( private httpClient:HttpClient ) { }

  private ejecutarQuery<T>(query: string){
    query = URL + query;
    query += `&api_key=${ apikey }&language=en-US`;
    console.log("petición completa", query);
    return this.httpClient.get<T>( query );
  }

  getPopulares (){ 
    
    const query = '/discover/movie?sort_by=popularity.desc';

    return this.ejecutarQuery<RespuestaMDB>(query);
  }
  getFeature(){

    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;
    if( mes < 10){
      mesString = '0' + mes;
    }else{
      mesString = mes;
    }

    const  inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const  fin    = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;
    //return this.httpClient.get<RespuestaMDB>(`/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc`);
    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?include_adult=false&primary_release_date_gte=${ inicio }&primary_release_date_gte=${ fin }&include_video=false&page=1&sort_by=popularity.desc`);
  }
}
