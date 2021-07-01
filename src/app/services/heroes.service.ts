import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL:string = 'https://heroesapp-cb04b.firebaseio.com/heroes.json';
  heroeURL:string = 'https://heroesapp-cb04b.firebaseio.com/heroes/';

  constructor(
    private _http:HttpClient
  ) { }

  nuevoHeroe( heroe:Heroe ) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post( this.heroesURL, body, { headers })
            .pipe(map( res=>{
            console.log(res);
            return res;
          } )
      );
  }

  actualizarHeroe( heroe:Heroe, key$:string ) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${ this.heroeURL }/${ key$ }.json`;

    return this._http.put( url, body, { headers })
            .pipe(map( res=>{
            console.log(res);
            return res;
          } )
      );
  }

  getHeroe( key$:String ):Observable<any>{
    let url = `${ this.heroeURL }/${ key$ }.json`;
    return this._http.get(url)
      .pipe(
        map( res => res )
      )
  }

  getHeroes( ):Observable<any>{
    return this._http.get(this.heroesURL)
      .pipe(
        map( res => res )
      )
  }

  borrarHeroe( key$:string ){
    let url = `${ this.heroeURL }/${ key$ }.json`;
    return this._http.delete(url).pipe(
      map(res => res)
    )
  }
}
