import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(urlImage: string, slide: boolean): string {
    if (urlImage && slide) {
      return 'https://image.tmdb.org/t/p/w1280'+urlImage;
    }
    else if (urlImage && !slide) {
      return 'https://image.tmdb.org/t/p/w500'+urlImage;
    } else {
      return './assets/img/no-image.jpg';
    }
  }

}
