import { Dia } from "./dia";

export class Rutina {
    _id!: string;
    nombre!: string;
    exigencia!: string;
    semanas!: Number;
    dias!: Array<string>;
    constructor() { }
}
