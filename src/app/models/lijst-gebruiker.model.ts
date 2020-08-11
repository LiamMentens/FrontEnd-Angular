import { Gebruiker } from './gebruiker.model'
import { Lijst } from './lijst.model'

export class LijstGebruiker {

    constructor(
        public lijstGebruikerID:number,
        public lijstID:number,
        public gebruikerID:number,
        public gebruiker:Gebruiker,
        public lijst:Lijst
    ){
    

    }
}
