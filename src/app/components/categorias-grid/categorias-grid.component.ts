import { Component, OnInit, Input } from '@angular/core';

// Services
import { PeliculasService } from 'src/app/services/peliculas.service';

// Interface
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-categorias-grid',
  templateUrl: './categorias-grid.component.html',
  styleUrls: ['./categorias-grid.component.css']
})
export class CategoriasGridComponent implements OnInit {

  @Input() genero: string;
  @Input() codigoGenero: number;

  public movies: Movie[] = [];

  constructor(
    private _ps: PeliculasService
  ) { }

  ngOnInit(): void {
    console.log(this.genero);
    this._ps.getPeliculaGenero(this.codigoGenero)
      .subscribe(movies => {

        for (let i = 0; i < 8; i++){
          this.movies.push(movies[i]);
        }
      })
  }



}
