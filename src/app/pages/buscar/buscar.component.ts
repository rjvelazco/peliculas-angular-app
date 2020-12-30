import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public busqueda: string;
  public movies: Movie[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private _ps: PeliculasService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      console.log(params.texto);
      this.busqueda = params.texto;
      this._ps.buscarPeliculas(params['texto'])
        .subscribe(movies => {
          this.movies = movies;
        })
    })

  }

}
