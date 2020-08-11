import { Item } from './item.model';
import { LijstGebruiker } from './lijst-gebruiker.model';
import { Gebruiker } from './gebruiker.model';
import { from } from 'rxjs';


export class Lijst {
    lijstID: number;
    naam: string;
    beschrijving: string;
    startDatum: Date;
    eindDatum: Date;
    gebruikerID: number;
    items: Item[];

    constructor(
        public LijstID: number,
        public Naam: string,
        public Beschrijving: string,
        public StartDatum: Date,
        public EindDatum: Date,
        public GebruikerID: number,
        public Items: Item[]
    ){

    }
}
