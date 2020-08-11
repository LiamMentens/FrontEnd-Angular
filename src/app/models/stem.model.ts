import { Gebruiker } from './gebruiker.model';
import { Item } from './item.model';

export class Stem {
    stemID:number;
    itemID:number;
    gebruikerID:number;
    item:Item;
    gebruiker:Gebruiker;

    constructor(
        public StemID:number ,
        public ItemID:number ,
        public GebruikerID:number ,
        public Item:Item ,
        public Gebruiker:Gebruiker ,
    ){

    }
}
