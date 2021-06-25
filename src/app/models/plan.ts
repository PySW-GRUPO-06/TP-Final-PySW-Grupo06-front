import { Cuota } from "./cuota";
import { DietaEstablecida } from "./dieta-establecida";
import { RegistroDieta } from "./registro-dieta";

export class Plan {
    _id!: string;
    tipo!: string
 fechaInicioPlan!: string
 fechaFinDelPlan!: string
 nivel!: string
 objetivo!: string
 registroDieta!: Array<string>
 dieta!: string;
 pago!: Array<string>
 rutina!: Array<string>
 constructor(){}
}
