import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieResponse;
  public cast: Cast[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private _ps: PeliculasService,
    private location: Location,
    private router: Router

  ) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;


    // -- Ejecutar varios Observables a la vez.
    combineLatest([
      this._ps.getPeliculaDetalles(id),
      this._ps.getCast(id)
      // Desestructuramos el Array de Observables en los diferentes resultado, segun las...
      // ...peticiones
    ]).subscribe(([pelicula, cast]) => {

      if (!pelicula) {
        this.router.navigate(['/home']);
        return;
      }
      this.movie = pelicula;
      this.cast = cast;
      console.log(pelicula);
      console.log(cast);
    })

  //   this._ps.getPeliculaDetalles(id).subscribe(movie => {
  //     if (!movie) {
  //       this.router.navigate(['/home']);
  //       return;
  //     }
  //     this.movie = movie
  //     console.log(movie);
  //   });

  //   this._ps.getCast(id).subscribe(cast => {
  //     this.cast = cast.filter(actor => actor.profile_path != null);
  //   });
  }

  onRegresar() {
    this.location.back();
  }

}
