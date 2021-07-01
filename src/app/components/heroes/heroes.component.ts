import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
  
  heroes:any[] = [];
  loading:boolean = true;
  
  constructor(
    private _heroesService: HeroesService
  ) {
    this._heroesService.getHeroes().subscribe( data => {
      // console.log(data);
      this.heroes = data;
      this.loading = false;

      /* setTimeout( ()=>{
        this.loading = false; 
        this.heroes = data;
      }, 3000); */

      /* for (let key$ in data) {
        let h = data[key$];
        h.key$ = key$;
        this.heroes.push(data[key$]);
      }
      console.log(this.heroes); */
    });
  }

  ngOnInit(): void {
  }

  borraHeroe( key$:string ){
    this._heroesService.borrarHeroe(key$).subscribe( respuesta => {
      if (respuesta) {
        console.error(respuesta);
      } else {
        //todo bien
        delete this.heroes[key$];
      }
    })
  }
}
