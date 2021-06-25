import { Cuota } from "./cuota";
import { DietaEstablecida } from "./dieta-establecida";
import { RegistroDieta } from "./registro-dieta";

export class Plan {
    _id: string="";
    tipo: string="";
    fechaInicioPlan: Date=new Date();
    fechaFinDelPlan: Date=new Date();
    nivel: string="";
    objetivo: string="";
    registroDieta: Array< RegistroDieta>=new Array<RegistroDieta>();
    //dieta:Dieta=new Dieta();
    pago: Array<Cuota>=new Array<Cuota>();
    //rutina: Array<Rutina>=new Array<Rutina>();
 constructor(){}
}
