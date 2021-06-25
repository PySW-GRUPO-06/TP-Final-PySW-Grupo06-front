import { Dia } from "./dia";

export class Rutina {
    _id:string="";
    nombre: string="";
 exigencia: string="";
 semanas: Number=0;
 dias: Array<Dia>=new Array<Dia>();
 constructor(){}
}
