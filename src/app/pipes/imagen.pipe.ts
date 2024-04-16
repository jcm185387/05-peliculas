import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})



export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    if(!img){
      return './assets/no-image-banner.jpg';
    }

    const imgUrl = ` ${ URL }/${ size }${img}`;

    //console.log('IMG URL', imgUrl);

    return imgUrl;
    //https://image.tmdb.org/t/p/original/i8YIjjAffCD21JbB8mR5QuaWsPS.jpg
  }

}
