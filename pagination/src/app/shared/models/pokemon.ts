import { PokemonStats } from "./pokemon-stats";
import { PokemonType } from "./pokemon-type";
import { PokemonDescription } from "./pokemon-description";
import { PokemonAbilityInfo } from "./pokemon-ability-info";
import { PokemonEntry } from "./pokemon-entry";

export class Pokemon {
  baseInfo: PokemonEntry;
  abilityInfo: PokemonAbilityInfo;
  descriptions: PokemonDescription[];
  types: PokemonType[];
  stats: PokemonStats;


  constructor(baseInfo: PokemonEntry, abilityInfo: PokemonAbilityInfo,
    descriptions: PokemonDescription[], types: PokemonType[], stats: PokemonStats) {
    this.baseInfo = baseInfo;
    this.abilityInfo = abilityInfo;
    this.descriptions = descriptions;
    this.types = types;
    this.stats = stats;
  }
}
