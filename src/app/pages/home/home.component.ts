import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  public movies: Movie[] = [];
  public moviesSlideShow: Movie[] = [];

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
