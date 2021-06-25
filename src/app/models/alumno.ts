import { Asistencia } from "./asistencia";
import { Persona } from "./persona";
import { Plan } from "./plan";

export class Alumno {
    _id!:string;
    persona!: string;
    fechaInicio!: Date
    registroPlan!: Array<string>
    planActivo!: string;
    asistencia!: Array<string>

    constructor(){}
}
