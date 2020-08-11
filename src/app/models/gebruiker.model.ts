import { Lijst } from './lijst.model';
import { Stem } from './stem.model';

export class Gebruiker {
    gebruikerID: number;
    email: string;
    wachtwoord: string;
    gebruikersnaam: string;
    token:string
    stemmen:Stem;

    constructor(
        public GebruikerID:number,
        public Email:string,
        public Wachtwoord:string,
        public Gebruikersnaam:string,
        public Token:string,
        public Stemmen:Stem[]
    ){}
}
