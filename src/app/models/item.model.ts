import { Lijst } from './lijst.model';
import { Stem } from './stem.model';

export class Item {
    itemID: number;
    lijstID:number;
    naam:string;
    beschrijving:string;
    foto:string;
    lijst:Lijst;
    stemmen:Stem[];

    constructor(
        public ItemID:number ,
        public LijstID:number ,
        public Naam:string ,
        public Beschrijving:string,
        public Foto:string,
        public Lijst:Lijst,
        public Stemmen:Stem[]
        ){

    }
}
