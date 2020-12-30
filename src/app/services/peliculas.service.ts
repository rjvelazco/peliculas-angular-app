import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  get params() {
    return {
      api_key: '75188fa306672670e99f310348bbb3b5',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera(): Observable<Movie[]> {

    if (this.cargando) {
      // 'of()' -> Permite emitir un observable que a su vez emite un valor
      return of([]);
    }
    
    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        // Solo cuando incremento el numero, la siguiente peticion es valida.
        this.cargando = false;
      })
    );
  }

  buscarPeliculas(texto: string):Observable<Movie[]> {

    const params = { ...this.params, page: '1', query: texto };
    
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      // params: params
      params
    }).pipe(
      map( resp => resp.results)
    )

  }

  getPeliculaDetalles(id: string) {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    )
  }

  getCast(id: string): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map(resp => resp.cast),
      catchError( err => of([]))
    )
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }


}
