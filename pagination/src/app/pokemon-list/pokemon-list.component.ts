import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonEntry } from '../shared/models/pokemon-entry';

// import {PaginationComponent} from "../shared/pagination/pagination.component";

@Component({
  providers: [PokemonService],
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html'
})
export class PokemonListComponent implements OnInit {
  loading: boolean = false;

  pokemons: PokemonEntry[];
  count: number = 0;
  offset: number = 0;
  limit: number = 20;

  constructor(private _pokemonService: PokemonService) { }

  ngOnInit() {
    this.findAll(this.offset, this.limit);
  }

  onPageChange(offset) {
    this.offset = offset;
    console.log(`Change to New Offset: ${this.offset}`);
    this.findAll(offset, this.limit);
  }

  findAll(offset: number, limit: number) {
    this.pokemons = [];
    this.loading = true;
    this._pokemonService.findAll(offset, limit).subscribe(result => {
      this.pokemons = result.pokemons;
      this.count = result.count;
      this.loading = false;
    }, () => this.loading = false);
  }

}
