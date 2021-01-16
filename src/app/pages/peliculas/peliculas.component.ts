import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

// Services
import { PeliculasService } from '../../services/peliculas.service';

// Interface
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styles: [
  ]
})
export class PeliculasComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 2000; 
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {

      if ( this._ps.cargando ) { return;}

      this._ps.getCartelera().subscribe(movies => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(
    private _ps: PeliculasService
  ) { }

  ngOnInit(): void {
    
    // Obtenemos la Cartelera
    
    this._ps.getCartelera()
      .subscribe(movies => {
        // console.log(resp.results);
        this.movies = movies;
        this.moviesSlideShow = movies;
      });
  }


  ngOnDestroy() {
    this._ps.resetCarteleraPage();
  }


}
