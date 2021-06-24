import { Asistencia } from "./asistencia";
import { Persona } from "./persona";
import { Plan } from "./plan";

export class Alumno {
    _id:string="";
    persona: Persona=new Persona();
 fechaInicio: Date=new Date();
 registroPlan: Array<Plan>=new Array<Plan>();
 planActivo: Plan=new Plan();
 asistencia: Array<Asistencia>=new Array<Asistencia>();

    constructor(){}
}
