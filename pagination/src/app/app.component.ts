import { Component, OnInit } from '@angular/core';
import { PokemonService } from './shared/services/pokemon.service';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PokemonService]
})
export class AppComponent implements OnInit {
  /**
   *
   */
  constructor(private _titleService: Title, private _router: Router) {
  }

  ngOnInit(){
    this._router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe(event => this._titleService.setTitle('Pokédex'));
  }
}
